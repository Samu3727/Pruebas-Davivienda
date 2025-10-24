import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser, getToken } from '../utils/auth';

export default function Login({ onLogin }) {
	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (getToken()) navigate('/notas', { replace: true });
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: correo, password: contrasena })
			});

			const contentType = res.headers.get('content-type') || '';
			let data = null;
			if (contentType.includes('application/json')) {
				data = await res.json();
			} else {
				const text = await res.text();
				data = { error: `Respuesta inesperada del servidor (${res.status})`, _raw: text.slice(0, 300) };
			}

			if (!res.ok) {
				setError(data.error || `Error al iniciar sesión: ${res.status}`);
				setLoading(false);
				return;
			}

						if (data.token) {
							setToken(data.token);
						}
						if (data.user) setUser(data.user);
						setLoading(false);
						if (onLogin) onLogin(true);
						navigate('/notas', { replace: true });
		} catch (err) {
			console.error(err);
			setError('No se pudo conectar al servidor');
			setLoading(false);
		}
	};

	return (
		<div className="d-flex align-items-center justify-content-center" style={{ minHeight: '85vh', background: 'linear-gradient(135deg,#74ABE2 0%,#5563DE 100%)' }}>
			<div className="card shadow-lg" style={{ width: 420, borderRadius: 12 }}>
				<div className="card-body p-4">
					<div className="text-center mb-3">
						<div style={{ fontSize: 36 }}>📝</div>
						<h4 className="card-title mb-0">Bienvenido</h4>
						<small className="text-muted">Inicia sesión para continuar</small>
					</div>

					{error && <div className="alert alert-danger" role="alert">{error}</div>}

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Correo</label>
							<input type="email" className="form-control" placeholder="ejemplo@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
						</div>
						<div className="mb-3">
							<label className="form-label">Contraseña</label>
							<input type="password" className="form-control" placeholder="********" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
						</div>
						<div className="d-grid gap-2">
							<button type="submit" className="btn btn-primary" disabled={loading}>
								{loading ? (
									<>
										<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
										Entrando...
									</>
								) : 'Entrar'}
							</button>
							<button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/register')}>Crear cuenta</button>
						</div>
					</form>

					<div className="text-center mt-3">
						<small className="text-muted">¿Olvidaste tu contraseña? Contacta al administrador.</small>
					</div>
				</div>
			</div>
		</div>
	);
}
