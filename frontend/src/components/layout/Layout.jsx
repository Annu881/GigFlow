import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 pb-12">
                {children}
            </main>
        </div>
    );
};

export default Layout;
