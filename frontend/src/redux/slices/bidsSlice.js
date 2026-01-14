import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Submit bid
export const submitBid = createAsyncThunk(
    'bids/submitBid',
    async (bidData, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/api/bids', bidData);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to submit bid'
            );
        }
    }
);

// Fetch bids for a gig
export const fetchGigBids = createAsyncThunk(
    'bids/fetchGigBids',
    async (gigId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/api/bids/gig/${gigId}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch bids'
            );
        }
    }
);

// Fetch my bids
export const fetchMyBids = createAsyncThunk(
    'bids/fetchMyBids',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/api/bids/user/my-bids');
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch my bids'
            );
        }
    }
);

// Hire bid
export const hireBid = createAsyncThunk(
    'bids/hireBid',
    async (bidId, { rejectWithValue }) => {
        try {
            const { data } = await api.patch(`/api/bids/${bidId}/hire`);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to hire freelancer'
            );
        }
    }
);

const bidsSlice = createSlice({
    name: 'bids',
    initialState: {
        bids: [],
        myBids: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearBids: (state) => {
            state.bids = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Submit bid
            .addCase(submitBid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitBid.fulfilled, (state, action) => {
                state.loading = false;
                state.myBids.unshift(action.payload);
            })
            .addCase(submitBid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch gig bids
            .addCase(fetchGigBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGigBids.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchGigBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch my bids
            .addCase(fetchMyBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyBids.fulfilled, (state, action) => {
                state.loading = false;
                state.myBids = action.payload;
            })
            .addCase(fetchMyBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Hire bid
            .addCase(hireBid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(hireBid.fulfilled, (state, action) => {
                state.loading = false;
                // Update the hired bid in the bids array
                const index = state.bids.findIndex(bid => bid._id === action.payload._id);
                if (index !== -1) {
                    state.bids[index] = action.payload;
                }
            })
            .addCase(hireBid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearBids } = bidsSlice.actions;
export default bidsSlice.reducer;
