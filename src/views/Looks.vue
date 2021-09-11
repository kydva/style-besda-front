<template>
    <div>
        <div class="looks">
            <div v-for="look in looks" :key="look._id" class="look">
                <div>
                    <img
                        class="img-fluid rounded look-img"
                        :src="'http://localhost:3000/img/looks/' + look.img"
                    />
                </div>
                <div class="pieces">
                    <div v-for="piece in look.pieces" :key="piece._id" class="piece">
                        <div class="dropdown">
                            <img
                                class="img-fluid rounded piece-img"
                                :src="'http://localhost:3000/img/pieces/' + piece.img"
                            />
                            <div class="piece-availability">
                                <div v-if="piece.inWardrobe"><i class="fas fa-check"></i></div>
                            </div>
                            <div class="dropdown-content">
                                <img
                                    class="img-fluid rounded"
                                    :src="'http://localhost:3000/img/pieces/' + piece.img"
                                />
                                <div
                                    class="add-to-wardrobe-btn"
                                    title="Add to wardrobe"
                                    v-if="!piece.inWardrobe"
                                    @click="addPieceToWardrobe(piece._id)"
                                >
                                    <i class="fas fa-plus"></i>
                                </div>
                                <div class="piece-name">{{ piece.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <InfiniteLoading :identifier="infiniteId" spinner="spiral" @infinite="infiniteHandler">
            <div slot="no-more"></div>
            <div slot="no-results" class="no-results">
                <div>
                    <div class="h2" v-if="user.wardrobe.length === 0">Your wardrobe is empty!</div>
                    <div class="h2" v-else>There are no recommendations for you :(</div>
                    <router-link
                        tag="button"
                        class="btn btn-success ms-auto mb-3 mt-1"
                        to="/wardrobe/fill-up"
                    >
                        <span class="h3"><i class="fas fa-plus"></i> Fill up your wardrobe</span>
                    </router-link>
                    <div class="h4 text-secondary">
                        Add items to your wardrobe and discover new outfit ideas
                    </div>
                </div>
            </div>
        </InfiniteLoading>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { ADD_TO_WARDROBE, FETCH_LOOKS } from "../store/actions.type";
import InfiniteLoading from "vue-infinite-loading";
import { PURGE_LOOKS } from "../store/mutations.type";

export default {
    components: { InfiniteLoading },
    props: {
        favorites: Boolean,
    },
    data() {
        return {
            query: {
                limit: 6,
                skip: 0,
            },
            infiniteId: 1,
        };
    },
    computed: {
        ...mapGetters(["user"]),
        ...mapState("looks", ["looks", "totalResults"]),
    },
    watch: {
        favorites() {
            this.infiniteId++;
        },
    },
    methods: {
        reloadLooks() {
            this.$store.commit("looks/" + PURGE_LOOKS);
            this.query.skip = 0;
            this.infiniteId++;
        },
        async infiniteHandler($state) {
            await this.$store.dispatch("looks/" + FETCH_LOOKS, this.query);
            if (this.looks.length === this.totalResults) {
                if (this.totalResults !== 0) {
                    $state.loaded();
                }
                return $state.complete();
            }
            this.query.skip = this.looks.length;
            $state.loaded();
        },
        async addPieceToWardrobe(pieceId) {
            await this.$store.dispatch("pieces/" + ADD_TO_WARDROBE, pieceId);
            this.reloadLooks();
        },
    },
};
</script>

<style scoped>
.no-results {
    margin-top: 25vh;
}

.looks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.look {
    width: 30%;
    padding: 1rem 2rem 0 2rem;
    margin: 1rem;
    border: 1px gray solid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 500px;
    border: 1px solid #b1b1b1;
    border-radius: 4px;
    background: rgb(249, 249, 249);
    background: linear-gradient(45deg, rgba(249, 249, 249, 1) 0%, rgba(255, 255, 255, 1) 100%);
    -webkit-box-shadow: -3px 2px 8px 0px rgba(34, 60, 80, 0.09);
    -moz-box-shadow: -3px 2px 8px 0px rgba(34, 60, 80, 0.09);
    box-shadow: -3px 2px 8px 0px rgba(34, 60, 80, 0.09);
}

.look-img {
    max-height: 300px;
}

.dropdown-content {
    bottom: 3rem;
    left: 2rem;
}

.pieces {
    display: flex;
    justify-content: center;
    padding-bottom: 0.5rem;
}

.piece-img {
    max-height: 50px;
    padding: 0 5px;
    cursor: pointer;
}

.piece-name {
    padding: 1rem;
    text-align: center;
}

.add-to-wardrobe-btn {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    cursor: pointer;
    color: #28a745;
}

@media screen and (max-width: 767.98px) {
    .look {
        flex: 90%;
    }
}
</style>