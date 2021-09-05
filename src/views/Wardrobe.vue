<template>
    <div>
        <div class="filter-panel">
            <form class="d-inline-flex p-2">
                <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    v-model="searchQuery"
                />
                <button class="btn btn-outline-secondary ms-2">Search</button>
            </form>

            <div class="filter-panel-item dropdown">
                Category <i class="fas fa-caret-down"></i>
                <div class="dropdown-content">
                    <PieceCategorySelect
                        class="float-left"
                        :multiple="true"
                        :alwaysOpen="true"
                        v-model="categories"
                    />
                </div>
            </div>

            <router-link
                tag="button"
                class="btn btn-outline-success ms-auto m-2"
                :to="filling ? '/wardrobe' : '/wardrobe/fill-up'"
            >
                <span v-if="filling" class="h5">Check my wardrobe</span>
                <span v-else class="h5"><i class="fas fa-plus"></i> Fill up</span>
            </router-link>
        </div>
        <div>
            <div class="row justify-content-center">
                <div
                    v-for="piece in pieces"
                    :key="piece._id"
                    class="col-lg-2 col-md-3 col-sm-5 piece"
                >
                    <div class="piece-name">{{ piece.name }}</div>
                    <div class="img-container">
                        <img
                            class="img-fluid piece-img rounded"
                            :src="'http://localhost:3000/img/' + piece.img"
                        />
                    </div>

                    <button
                        v-if="!piece.inWardrobe"
                        @click="addToWardrobe(piece._id)"
                        class="btn btn-outline-success"
                    >
                        <i class="fas fa-plus"></i> Add
                    </button>
                    <button
                        v-else
                        @click="removeFromWardrobe(piece._id)"
                        class="btn btn-outline-danger"
                    >
                        <i class="fas fa-minus"></i> Remove
                    </button>
                </div>
            </div>
            <InfiniteLoading :identifier="infiniteId" spinner="spiral" @infinite="infiniteHandler">
                <div slot="no-more"></div>
            </InfiniteLoading>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import PieceCategorySelect from "../components/PieceCategorySelect.vue";
import { FETCH_PIECES, ADD_TO_WARDROBE, REMOVE_FROM_WARDROBE } from "../store/actions.type";
import { PURGE_PIECES } from "../store/mutations.type";
export default {
    components: { PieceCategorySelect, InfiniteLoading },
    props: {
        //If false, the component will only display items from the user's wardrobe, otherwise, all items will be displayed.
        filling: Boolean,
    },
    data() {
        return {
            categories: [],
            searchQuery: "",
            limit: 15,
            skip: 0,
        };
    },
    computed: {
        ...mapState("pieces", ["pieces", "totalResults"]),
        infiniteId() {
            return this.searchQuery + this.filling + this.categories.toString();
        },
    },
    watch: {
        infiniteId() {
            this.$store.commit("pieces/" + PURGE_PIECES);
        },
    },

    methods: {
        async fetchPieces() {
            const query = {
                categories: this.categories,
                searchQuery: this.searchQuery,
                inWardrobe: !this.filling,
                limit: this.limit,
                skip: this.skip,
            };
            await this.$store.dispatch("pieces/" + FETCH_PIECES, query);
        },
        async infiniteHandler($state) {
            await this.fetchPieces();
            if (this.totalResults === this.pieces.length) {
                if (this.totalResults !== 0) {
                    $state.loaded();
                }
                $state.complete();
            } else {
                this.skip += this.limit;
                $state.loaded();
            }
        },
        async addToWardrobe(pieceId) {
            await this.$store.dispatch("pieces/" + ADD_TO_WARDROBE, pieceId);
        },
        async removeFromWardrobe(pieceId) {
            await this.$store.dispatch("pieces/" + REMOVE_FROM_WARDROBE, pieceId);
        },
    },
};
</script>

<style scoped>
.filter-panel {
    margin-top: 2rem;
    display: flex;
    background-color: #292b2c;
}

.filter-panel-item {
    padding: 1rem;
    color: #81898f;
}

.piece {
    padding: 0 2rem 0 2rem;
    margin: 1rem;
    border: 1px gray solid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
}

.img-fluid {
    max-height: 150px;
}

.piece .btn,
.piece-name {
    margin: 1rem 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.5s;
}
.slide-enter,
.slide-leave-to {
    opacity: 0;
}
</style>