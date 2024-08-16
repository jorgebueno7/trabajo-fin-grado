const ConfirmLoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="p-4 text-center bg-white border border-gray-300 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Te damos la bienvenida a Sportly Events</h5>
                <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Para poder disfrutar de nuestro sitio web.
                    Confirma tu cuenta con el email que te hemos enviado</p>
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href="https://mailtrap.io/inboxes/3055831/messages" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <div className="text-left rtl:text-right">
                            <div className="-mt-1 font-sans text-sm font-semibold">Confirmar email</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ConfirmLoginPage;