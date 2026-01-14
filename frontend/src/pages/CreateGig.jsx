import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGig } from '../redux/slices/gigsSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateGig = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: '',
        category: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.gigs);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(createGig({
            ...formData,
            budget: Number(formData.budget),
        }));

        if (createGig.fulfilled.match(result)) {
            toast.success('Gig created successfully!');
            navigate('/my-gigs');
        } else {
            toast.error(result.payload || 'Failed to create gig');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8">
                <h1 className="text-3xl font-bold mb-6 text-gradient">Post a New Gig</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., Build a responsive website"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-field min-h-32"
                            placeholder="Describe your project in detail..."
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-field bg-slate-800 text-white"
                            required
                        >
                            <option value="" className="text-gray-400">Select a Category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Game Development">Game Development</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Logo Design">Logo Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="SEO & SEM">SEO & SEM</option>
                            <option value="Content Writing">Content Writing</option>
                            <option value="Translation">Translation</option>
                            <option value="Video Editing">Video Editing</option>
                            <option value="Animation">Animation</option>
                            <option value="Music & Audio">Music & Audio</option>
                            <option value="Voice Over">Voice Over</option>
                            <option value="Data Entry">Data Entry</option>
                            <option value="Virtual Assistant">Virtual Assistant</option>
                            <option value="Business Consulting">Business Consulting</option>
                            <option value="Legal Services">Legal Services</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Budget ($)</label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="1000"
                            min="0"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-gradient w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Post Gig'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGig;
