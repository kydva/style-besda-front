import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import piecesApi from "../../api/pieces";

export default {
    state: {
        pieces: [],
        totalResults: null
    },
    actions: {
        async [actions.ADD_PIECE](context, piece){
            await piecesApi.create(piece);
        },

        async [actions.REMOVE_PIECE]({commit}, pieceId){
            await piecesApi.delete(pieceId);
            commit(mutations.REMOVE_PIECE);
        },

        async [actions.FETCH_PIECES]({commit, state}, query = {}){
            const res = await piecesApi.get(query);
            if (query.skip === state.pieces.length && query.skip !== 0) {
                commit(mutations.ADD_PIECES, res.data.pieces);
            } else {
                commit(mutations.SET_PIECES, res.data.pieces);
                commit(mutations.SET_TOTAL_RESULTS, res.data.totalResults);
            }
        },

        async [actions.ADD_TO_WARDROBE]({commit}, pieceId) {
            await piecesApi.addToWardrobe(pieceId);
            commit(mutations.ADD_TO_WARDROBE, pieceId);
        },

        async [actions.REMOVE_FROM_WARDROBE]({commit}, pieceId) {
            await piecesApi.removeFromWardrobe(pieceId);
            commit(mutations.REMOVE_FROM_WARDROBE, pieceId);
        }
    },
    mutations: {
        [mutations.SET_PIECES](state, pieces) {
            state.pieces = pieces;
        },

        [mutations.ADD_PIECES](state, pieces) {
            state.pieces = state.pieces.concat(pieces);
        },

        [mutations.REMOVE_PIECE](state, pieceId) {
            state.pieces = state.pieces.filter((piece) => piece._id != pieceId);
        },

        [mutations.PURGE_PIECES](state) {
            state.pieces = [];
        },

        [mutations.SET_TOTAL_RESULTS](state, count) {
            state.totalResults = count;
        },

        [mutations.ADD_TO_WARDROBE](state, pieceId) {
            const piece = state.pieces.find((piece) => piece._id === pieceId);
            if (piece) {
                piece.inWardrobe = true;
            }
        },

        [mutations.REMOVE_FROM_WARDROBE](state, pieceId) {
            const piece = state.pieces.find((piece) => piece._id === pieceId);
            if (piece) {
                piece.inWardrobe = false;
            }
        }
    },

    namespaced: true
};