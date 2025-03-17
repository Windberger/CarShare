import {Link} from "react-router-dom";

function Homepage() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-between w-screen">
            {/* Navbar */}
            <nav className="bg-[#194569] text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">CarShare</h1>
                <ul className="flex space-x-4">
                    <li><a href="#features" className="hover:underline">Features</a></li>
                    <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
                    <li><a href="#contact" className="hover:underline">Contact</a></li>
                </ul>
                <div>
                    <Link className="bg-white text-[#194569] px-4 py-2 rounded mr-2" to="/login">Login</Link>
                    <Link className="bg-green-500 text-white px-4 py-2 rounded" to="/login">Sign Up</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-[#194569] text-white py-32 text-center flex flex-col items-center">
                <h2 className="text-3xl font-bold">Create Carpools with Your Friends</h2>
                <p className="mt-2">Save money, reduce emissions, and travel smarter.</p>
                <Link className="mt-4 px-6 py-2 bg-white text-[#194569] font-bold rounded" to="/login">Get Started</Link>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 text-center text-black">
                <h3 className="text-2xl font-bold">Why Use CarShare?</h3>
                <div className="mt-6 flex justify-center space-x-6">
                    <div className="p-4 bg-white shadow-lg rounded-2xl w-1/4">
                        <h4 className="font-semibold">Save Money</h4>
                        <p>Split fuel costs with friends.</p>
                    </div>
                    <div className="p-4 bg-white shadow-lg rounded-2xl w-1/4">
                        <h4 className="font-semibold">Eco-Friendly</h4>
                        <p>Reduce CO₂ emissions by sharing rides.</p>
                    </div>
                    <div className="p-4 bg-white shadow-lg rounded-2xl w-1/4">
                        <h4 className="font-semibold">Easy to Use</h4>
                        <p>Plan and track rides effortlessly.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-gray-200 text-center text-black">
                <h3 className="text-2xl font-bold">What Our Users Say</h3>
                <p className="mt-4 italic">"This app has saved me so much money on commuting!" – Alex</p>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-[#194569] text-white py-6 text-center">
                <p>&copy; 2025 CarShare. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Homepage;