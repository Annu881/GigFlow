import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Fetch all gigs
export const fetchGigs = createAsyncThunk(
    'gigs/fetchGigs',
    async ({ search = '', category = '' } = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/gigs?search=${search}&category=${category}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Fetch single gig
export const fetchGigById = createAsyncThunk(
    'gigs/fetchGigById',
    async (gigId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/api/gigs/${gigId}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch gig'
            );
        }
    }
);

// Create gig
export const createGig = createAsyncThunk(
    'gigs/createGig',
    async (gigData, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/api/gigs', gigData);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create gig'
            );
        }
    }
);

// Fetch my gigs
export const fetchMyGigs = createAsyncThunk(
    'gigs/fetchMyGigs',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/api/gigs/user/my-gigs');
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch my gigs'
            );
        }
    }
);

// Delete gig
export const deleteGig = createAsyncThunk(
    'gigs/deleteGig',
    async (gigId, { rejectWithValue }) => {
        try {
            await api.delete(`/api/gigs/${gigId}`);
            return gigId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete gig'
            );
        }
    }
);

const gigsSlice = createSlice({
    name: 'gigs',
    initialState: {
        gigs: [],
        currentGig: null,
        myGigs: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentGig: (state) => {
            state.currentGig = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch gigs
            .addCase(fetchGigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGigs.fulfilled, (state, action) => {
                state.loading = false;
                state.gigs = action.payload;
            })
            .addCase(fetchGigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch gig by ID
            .addCase(fetchGigById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGigById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGig = action.payload;
            })
            .addCase(fetchGigById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create gig
            .addCase(createGig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGig.fulfilled, (state, action) => {
                state.loading = false;
                state.myGigs.unshift(action.payload);
            })
            .addCase(createGig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch my gigs
            .addCase(fetchMyGigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyGigs.fulfilled, (state, action) => {
                state.loading = false;
                state.myGigs = action.payload;
            })
            .addCase(fetchMyGigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete gig
            .addCase(deleteGig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGig.fulfilled, (state, action) => {
                state.loading = false;
                state.myGigs = state.myGigs.filter((gig) => gig._id !== action.payload);
                state.gigs = state.gigs.filter((gig) => gig._id !== action.payload);
            })
            .addCase(deleteGig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearCurrentGig } = gigsSlice.actions;
export default gigsSlice.reducer;
