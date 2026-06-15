const container = document.getElementById('hearts');
const densityEl = document.getElementById('density');
const toggleBtn = document.getElementById('toggle');

// Supabase client - replace with your project's values
const SUPABASE_URL = "https://fjhakjrxbdiowjkppgzy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaGFranJ4YmRpb3dqa3BwZ3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMDM3MDQsImV4cCI6MjA4NTU3OTcwNH0.4m-t-4jzXj1yVEajD1Gwukf5GxchdaLMl-0PaJr5BR0";
let supabaseClient = null;
let supabaseInitPromise = null;

function initSupabaseClient(){
	if(supabaseClient) return Promise.resolve(supabaseClient);
	if(supabaseInitPromise) return supabaseInitPromise;

	supabaseInitPromise = (async ()=>{
		try{
			if(typeof createClient === 'function'){
				supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
				console.log('Supabase: initialized using global createClient');
				return supabaseClient;
			}
			if(window.supabase && typeof window.supabase.createClient === 'function'){
				supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
				console.log('Supabase: initialized using window.supabase.createClient');
				return supabaseClient;
			}

			// Try dynamic ESM import from jsDelivr
			console.log('Supabase: attempting dynamic import (+esm)');
			const module = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
			const createClientFromModule = module.createClient || module.default && module.default.createClient;
			const createFn = createClientFromModule || module.createClient;
			if(typeof createFn === 'function'){
				supabaseClient = createFn(SUPABASE_URL, SUPABASE_ANON_KEY);
				console.log('Supabase: initialized using dynamic import');
				return supabaseClient;
			}

			console.warn('Supabase createClient not found after dynamic import', module);
			return null;
		}catch(err){
			console.error('initSupabaseClient error', err);
			return null;
		}
	})();

	return supabaseInitPromise;
}

// start initialization in background
initSupabaseClient();

const sendBtn = document.getElementById('sendBtn');
const messageEl = document.getElementById('message');

let running = true;
let density = densityEl ? Number(densityEl.value) || 12 : 12;

if (densityEl) densityEl.addEventListener('input', ()=> density = Number(densityEl.value));
if (toggleBtn) toggleBtn.addEventListener('click', ()=>{ running = !running; toggleBtn.textContent = running ? 'Pause' : 'Play'; });

function rand(min, max){ return Math.random() * (max - min) + min }

function createHeart(){
	const el = document.createElement('div');
	el.className = 'heart';
	const size = Math.round(rand(12, 44));
	el.style.setProperty('--size', `${size}px`);
	el.style.left = `${rand(0,100)}%`;
	el.style.setProperty('--duration', `${rand(4.5,9).toFixed(2)}s`);
	el.style.setProperty('--delay', `${rand(0,1.8).toFixed(2)}s`);
	el.style.setProperty('--tx', `${Math.round(rand(-120,120))}px`);
	container.appendChild(el);
	el.addEventListener('animationend', ()=> el.remove());
}

let intervalId = null;
function start(){
	stop();
	intervalId = setInterval(()=>{
		if(!running) return;
		const toSpawn = Math.max(1, Math.round(density / 2));
		for(let i=0;i<toSpawn;i++) createHeart();
	}, 300);
}
function stop(){ if(intervalId) clearInterval(intervalId); intervalId = null }

start();

// make a few initial hearts
for(let i=0;i<6;i++) setTimeout(createHeart, i*200);

// Pause when page hidden to save CPU
document.addEventListener('visibilitychange', ()=>{ if(document.hidden) running = false; else running = true });

// Send to Supabase when clicking the send button
async function sendToSupabase(text){
	if(!supabaseClient){
		console.error('sendToSupabase: supabaseClient is null');
		alert('Supabase chưa cấu hình hoặc thư viện chưa tải. Kiểm tra console để biết chi tiết.');
		return;
	}
	try{
		const payload = { message: text };
		console.debug('sendToSupabase: inserting', payload);
		const { data, error } = await supabaseClient.from('nhom').insert([payload]);
		console.debug('sendToSupabase: result', { data, error });
		if(error) throw error;
		return data;
	}catch(err){
		console.error('Supabase insert error', err);
		throw err;
	}
}

if(sendBtn){
	sendBtn.addEventListener('click', async ()=>{
		const text = messageEl ? messageEl.value.trim() : '';
		if(!text){
			// create a small local heart burst as feedback even without sending
			for(let i=0;i<3;i++) createHeart();
			return;
		}
		sendBtn.disabled = true;
		try{
			await sendToSupabase(text);
			if(messageEl) messageEl.value = '';
			// small confirmation: spawn a few hearts
			for(let i=0;i<6;i++) setTimeout(createHeart, i*80);
		}catch(e){
			alert('Lỗi khi gửi. Kiểm tra console.');
		}finally{ sendBtn.disabled = false }
	});
}

