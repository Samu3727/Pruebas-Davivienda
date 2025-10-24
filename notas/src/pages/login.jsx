import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Placeholder: implement auth flow as needed
		navigate('/notas');
	};

	return (
		<div className="d-flex justify-content-center">
			<div className="card" style={{ width: 420 }}>
				<div className="card-body">
					<h4 className="card-title mb-3">Iniciar sesión</h4>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Correo</label>
							<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<div className="mb-3">
							<label className="form-label">Contraseña</label>
							<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
						</div>
						<div className="d-flex justify-content-between align-items-center">
							<button type="submit" className="btn btn-primary">Entrar</button>
							<button type="button" className="btn btn-link" onClick={() => navigate('/crear-nota')}>Crear cuenta</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
