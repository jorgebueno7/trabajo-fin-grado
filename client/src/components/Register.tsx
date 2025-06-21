import React, { useState, useEffect, useContext } from 'react';
// import { getUsers } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../api/users';
import UserContext from '../context/UsersContext';

const Register = () => {
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [role, setRole] = useState('participante');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [deporte, setDeporte] = useState('');
    const [mejorMarca, setMejorMarca] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [lengthRequirement, setLengthRequirement] = useState(false);
    const [numberRequirement, setNumberRequirement] = useState(false);
    const [lowercaseRequirement, setLowercaseRequirement] = useState(false);
    const [uppercaseRequirement, setUppercaseRequirement] = useState(false);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
    // const [isAdminUser, setIsAdminUser] = useState(false);
    // const [isAdminExists, setIsAdminExists] = useState(false);
    const [formError, setFormError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const navigateConfirmLogin = () => {
        navigate('/confirm_login');
    };

    // const { isAdmin, setIsAdmin, setUser } = useContext(UserContext);

    const { setUser } = useContext(UserContext);

    // interface User {
    //     isAdminUser: boolean;
    // }

    // const fetchUsers = async () => {
    //     const users = await getUsers();
    //     const adminExists = users.some((user: User) => user.isAdminUser);
    //     setIsAdminExists(adminExists);
    // };

    const comparePasswords = (password: string, repeatPassword: string) => {
        if (password !== repeatPassword) {
            setPasswordError('Las contraseñas no coinciden');
        } else {
            setPasswordError('');
        }
    };

    useEffect(() => {
        setLengthRequirement(password.length >= 8);
        setNumberRequirement(/\d/.test(password));
        setLowercaseRequirement(/[a-z]/.test(password));
        setUppercaseRequirement(/[A-Z]/.test(password));
        comparePasswords(password, repeatPassword);
        // fetchUsers();
    }, [password, repeatPassword]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormError('');

        console.log("Datos del formulario: ", dni, nombre, apellidos, email, password, repeatPassword, role, telefono, direccion, altura, peso, deporte, mejorMarca, fechaNacimiento);
        if (!dni || !nombre || !apellidos || !email || !password || !repeatPassword || !role || !telefono || !direccion || !altura || !peso || !deporte || !mejorMarca || !fechaNacimiento) {
            setFormError('Todos los campos son obligatorios.');
            return;
        }
        if (!lengthRequirement || !numberRequirement || !uppercaseRequirement) {
            setFormError('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula y un número.');
            return;
        }

        try {           
            const response = await addUser({
                dni,
                nombre,
                apellidos,
                email,
                password,
                // isAdminUser,
                role,
                telefono,
                direccion,
                altura,
                peso,
                deporte,
                mejor_marca: mejorMarca,
                fecha_nacimiento: fechaNacimiento,
            });
            setUser(response);
            console.log("Respuesta del registro del usuario: ", response);

            // if (isAdminUser) {
            //     setIsAdmin(true);
            // }

            navigateConfirmLogin();
        } catch (error: any) {
            if (error.response && error.response.data) {
                setFormError(error.response.data.message || 'Error al crear el usuario');
            } else {
                setFormError('Error inesperado');
            }
            console.error(error);
        }
    };

    const handleNext = () => {
        if (currentPage === 1) {
            if (!dni || !nombre || !apellidos || !email || !password || !repeatPassword) {
                setFormError('Por favor completa todos los campos obligatorios.');
                return;
            }
            setFormError('');
            setCurrentPage(2);
        }
    };

    const handlePrevious = () => {
        setCurrentPage(1);
    };

    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Registrate</h5>
                    {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}
                    {currentPage === 1 && (
                        <>
                            <div className="mb-5">
                            <label htmlFor="dni" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI</label>
                            <input 
                                type="text" 
                                id="dni" 
                                onChange={e => setDni(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="DNI" 
                                required 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                onChange={e => setNombre(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="Nombre" 
                                required 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="apellidos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                            <input 
                                type="text" 
                                id="apellidos" 
                                onChange={e => setApellidos(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="Apellidos" 
                                required 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                onChange={e => setEmail(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="example@sportly.com" 
                                required 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                onFocus={() => setIsPasswordInputFocused(true)}
                                onBlur={() => setIsPasswordInputFocused(false)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="••••••••" 
                                required 
                            />
                            {isPasswordInputFocused && (
                                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                    <li className={`flex items-center ${lengthRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${lengthRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        La contraseña debe tener al menos 8 caracteres
                                    </li>
                                    <li className={`flex items-center ${numberRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${numberRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        Debe incluir al menos un número
                                    </li>
                                    <li className={`flex items-center ${lowercaseRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${lowercaseRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        Debe incluir al menos una letra minúscula
                                    </li>
                                    <li className={`flex items-center ${uppercaseRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${uppercaseRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        Debe incluir al menos una letra mayúscula
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repite tu contraseña</label>
                            <input 
                                type="password" 
                                id="repeat-password" 
                                value={repeatPassword} 
                                onChange={e => setRepeatPassword(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="••••••••" 
                                required 
                            />
                            {passwordError && (
                                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Selecciona tu rol
                            </label>
                            <select 
                                id="role" 
                                value={role} 
                                onChange={e => setRole(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="participante">Participante</option>
                                <option value="organizador">Organizador</option>
                            </select>
                        </div>



                        {/* <div className="mb-4 border-b mx-auto border-gray-200 dark:border-gray-700">
                            <label htmlFor="user-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de usuario</label>
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li className="me-2">
                                    <a href="#" className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" aria-current="page">Tab 1</a>
                                </li>
                                <li className="me-2">
                                    <a href="#"  className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Tab 2</a>
                                </li>
                            </ul>
                        </div> */}



                        {/* <div className="mb-5">
                            <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={isAdmin} 
                                    disabled={isAdminExists}
                                    onChange={e => { const checked = e.target.checked;
                                        setIsAdminUser(checked);
                                        if (checked) {
                                            setIsAdmin(true);
                                        } else {
                                            setIsAdmin(false); // Reseteamos el contexto si se desmarca
                                        }}
                                    }
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Administrador</span>
                            </label>
                        </div> */}
                        <button 
                            type="button" 
                            onClick={handleNext} 
                            className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            <span>&#8680;</span>
                        </button>
                        </>
                        
                    )} 
                    {currentPage === 2 && (
                        <>
                            <div className="mb-5">
                                <label htmlFor="fecha_nacimiento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Nacimiento</label>
                                <input 
                                    type="date" 
                                    id="fecha_nacimiento" 
                                    onChange={e => setFechaNacimiento(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    required 
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                                <input 
                                    type="text" 
                                    id="telefono" 
                                    onChange={e => setTelefono(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="Teléfono" 
                                    required 
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                                <input 
                                    type="text" 
                                    id="direccion" 
                                    onChange={e => setDireccion(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="Dirección" 
                                    required 
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="altura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Altura (cm)</label>
                                <input 
                                    type="text" 
                                    id="altura" 
                                    onChange={e => setAltura(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="Altura" 
                                    required 
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso (kg)</label>
                                <input 
                                    type="text" 
                                    id="peso" 
                                    onChange={e => setPeso(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="Peso" 
                                    required 
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="deporte" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deporte</label>
                                <input 
                                    type="text" 
                                    id="deporte" 
                                    onChange={e => setDeporte(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="Deporte" 
                                    required 
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="mejor_marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mejor Marca</label>
                                <input 
                                    type="text" 
                                    id="mejor_marca" 
                                    onChange={e => setMejorMarca(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="Mejor Marca" 
                                    required 
                                />
                            </div>
                            
                            <button 
                                type="button" 
                                onClick={handlePrevious} 
                                className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            >
                                <span>&#8678;</span>
                            </button>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                            >
                                Crear cuenta
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;

// import React, { useState, useEffect, useContext } from 'react';
// import { getUsers, addUser } from '../../api/users';
// import { useNavigate } from 'react-router-dom';
// import UserContext from '../../context/UsersContext';

// interface FormData {
//     dni: string;
//     nombre: string;
//     apellidos: string;
//     email: string;
//     password: string;
//     repeatPassword: string;
//     telefono: string;
//     direccion: string;
//     altura: string;
//     peso: string;
//     deporte: string;
//     mejorMarca: string;
//     fechaNacimiento: string;
//     isAdminUser: boolean;
// }

// interface PasswordErrors {
//     length: boolean;
//     number: boolean;
//     lowercase: boolean;
//     uppercase: boolean;
//     match: boolean;
// }

// const Register: React.FC = () => {
//     const [formData, setFormData] = useState<FormData>({
//         dni: '',
//         nombre: '',
//         apellidos: '',
//         email: '',
//         password: '',
//         repeatPassword: '',
//         telefono: '',
//         direccion: '',
//         altura: '',
//         peso: '',
//         deporte: '',
//         mejorMarca: '',
//         fechaNacimiento: '',
//         isAdminUser: false,
//     });
    
//     const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
//         length: false,
//         number: false,
//         lowercase: false,
//         uppercase: false,
//         match: false,
//     });
    
//     const [formError, setFormError] = useState<string>('');
//     const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
//     const [isAdminExists, setIsAdminExists] = useState<boolean>(false);
//     const [currentPage, setCurrentPage] = useState<number>(1);

//     const navigate = useNavigate();
//     const { setIsAdmin, setUser } = useContext(UserContext);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const users = await getUsers();
//                 const adminExists = users.some((user: FormData) => user.isAdminUser);
//                 setIsAdminExists(adminExists);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };
//         fetchUsers();
//     }, []);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//         validatePassword(name, value);
//     };

//     const validatePassword = (name: string, value: string) => {
//         if (name === 'password' || name === 'repeatPassword') {
//             const { password, repeatPassword } = formData;
//             setPasswordErrors({
//                 length: password.length >= 8,
//                 number: /\d/.test(password),
//                 lowercase: /[a-z]/.test(password),
//                 uppercase: /[A-Z]/.test(password),
//                 match: password === repeatPassword,
//             });
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (Object.values(formData).some(field => !field)) {
//             setFormError('Todos los campos son obligatorios.');
//             return;
//         }

//         if (!passwordErrors.length || !passwordErrors.number || !passwordErrors.uppercase || !passwordErrors.match) {
//             setFormError('La contraseña no cumple con los requisitos.');
//             return;
//         }

//         try {
//             const response = await addUser({ 
//                 ...formData, 
//                 isAdminUser,
//                 fecha_nacimiento: formData.fechaNacimiento,
//                 mejor_marca: formData.mejorMarca
//             });
//             setUser(response.data);
//             if (isAdminUser) setIsAdmin(true);
//             navigate('/confirm_login');
//         } catch (error: any) {
//             setFormError(error.response?.data?.message || 'Error al crear el usuario');
//         }
//     };

//     const handleNext = () => {
//         if (currentPage === 1 && Object.values(formData).slice(0, 5).some(field => !field)) {
//             setFormError('Por favor completa todos los campos obligatorios.');
//         } else {
//             setCurrentPage(prev => prev + 1);
//         }
//     };

//     const handlePrevious = () => {
//         setCurrentPage(prev => prev - 1);
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen">
//             <div className="w-full max-w-sm bg-white border rounded-lg shadow">
//                 <form onSubmit={handleSubmit}>
//                     <h5 className="text-xl text-center">Regístrate</h5>
//                     {formError && <p className="text-red-600">{formError}</p>}
//                     {currentPage === 1 && (
//                         <>
//                             <input name="dni" placeholder="DNI" onChange={handleChange} required />
//                             <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
//                             <input name="apellidos" placeholder="Apellidos" onChange={handleChange} required />
//                             <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//                             <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
//                             <input name="repeatPassword" type="password" placeholder="Repite tu contraseña" onChange={handleChange} required />
//                             <label>
//                                 <input type="checkbox" checked={isAdminUser} onChange={() => setIsAdminUser(!isAdminUser)} />
//                                 Administrador
//                             </label>
//                             <button type="button" onClick={handleNext}>Siguiente</button>
//                         </>
//                     )}
//                     {currentPage === 2 && (
//                         <>
//                             <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
//                             <input name="direccion" placeholder="Dirección" onChange={handleChange} required />
//                             <input name="altura" placeholder="Altura" onChange={handleChange} required />
//                             <input name="peso" placeholder="Peso" onChange={handleChange} required />
//                             <input name="deporte" placeholder="Deporte" onChange={handleChange} required />
//                             <input name="mejorMarca" placeholder="Mejor Marca" onChange={handleChange} required />
//                             <input name="fechaNacimiento" type="date" onChange={handleChange} required />
//                             <button type="button" onClick={handlePrevious}>Anterior</button>
//                             <button type="submit">Crear cuenta</button>
//                         </>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Register;
