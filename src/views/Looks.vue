<template>
    <div class="container">
        <div class="filter-panel text-secondary">
            <div class="filter-panel-item">
                <select
                    class="form-select"
                    @change="(e) => this.$router.push('/looks/' + e.target.value)"
                >
                    <option value="recommended">Recommended</option>
                    <option value="favorites">Favorites</option>
                </select>
            </div>

            <div class="filter-panel-item">
                <label class="me-2" for="season">Season:</label>
                <select class="form-select" id="season" v-model="season">
                    <option :value="null">Any</option>
                    <option value="Summer">Summer</option>
                    <option value="Demi-season">Demi-season</option>
                    <option value="Winter">Winter</option>
                </select>
            </div>

            <div class="filter-panel-item ms-md-auto">
                <label class="me-2" for="show-disliked">Show disliked:</label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="show-disliked"
                    v-model="showDisliked"
                />
            </div>
        </div>

        <div class="looks">
            <div v-for="look in looks" :key="look._id" class="look">
                <div class="fa-2x d-flex justify-content-between">
                    <div>
                        <i
                            title="Add to favorites"
                            :class="look.isLiked ? 'fas' : 'far'"
                            :style="look.isDisliked ? 'visibility: hidden' : ''"
                            class="like-btn fa-thumbs-up"
                            @click="onLikeBtnClick(look)"
                        ></i>
                    </div>
                    <router-link :to="'/looks/' + look._id" class="look-img-container">
                        <img
                            class="img-fluid rounded look-img"
                            :src="$baseUrl + '/img/looks/' + look.img"
                        />
                    </router-link>
                    <div>
                        <i
                            title="Hide"
                            :class="look.isDisliked ? 'fas' : 'far'"
                            :style="look.isLiked ? 'visibility: hidden' : ''"
                            class="dislike-btn fa-thumbs-down"
                            @click="onDislikeBtnClick(look)"
                        ></i>
                    </div>
                </div>
                <div class="pieces">
                    <div v-for="piece in look.pieces" :key="piece._id" class="piece">
                        <div class="dropdown">
                            <img
                                class="img-fluid rounded piece-img"
                                :src="$baseUrl + '/img/pieces/' + piece.img"
                            />
                            <div class="piece-availability">
                                <div v-if="piece.inWardrobe"><i class="fas fa-check"></i></div>
                            </div>
                            <div class="dropdown-content">
                                <img
                                    class="img-fluid rounded"
                                    :src="$baseUrl + '/img/pieces/' + piece.img"
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
                <div v-if="favorites" class="h2 text-secondary">Empty</div>
                <div v-else>
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
import { mapGetters, mapMutations, mapState } from "vuex";
import {
    ADD_TO_FAVORITES,
    ADD_TO_WARDROBE,
    CANCEL_LOOK_DISLIKE,
    DISLIKE_LOOK,
    FETCH_LOOKS,
    REMOVE_FROM_FAVORITES,
} from "../store/actions.type";
import InfiniteLoading from "vue-infinite-loading";
import { PURGE_LOOKS } from "../store/mutations.type";

export default {
    components: { InfiniteLoading },
    props: {
        favorites: Boolean,
    },
    data() {
        return {
            limit: 6,
            skip: 0,
            season: null,
            showDisliked: false,
            infiniteId: 1,
        };
    },
    computed: {
        ...mapGetters(["user"]),
        ...mapState("looks", ["looks", "totalResults"]),
        filter() {
            return {
                season: this.season,
                showDisliked: this.showDisliked,
                favorites: this.favorites,
            };
        },
    },
    watch: {
        filter() {
            this.reloadLooks();
        },
    },
    methods: {
        ...mapMutations("looks", [PURGE_LOOKS]),
        reloadLooks() {
            this.purgeLooks();
            this.skip = 0;
            this.infiniteId++;
        },
        async infiniteHandler($state) {
            const query = {
                ...this.filter,
                limit: this.limit,
                skip: this.skip,
            };
            await this.$store.dispatch("looks/" + FETCH_LOOKS, query);
            if (this.looks.length === this.totalResults) {
                if (this.totalResults !== 0) {
                    $state.loaded();
                }
                return $state.complete();
            }
            this.skip = this.looks.length;
            $state.loaded();
        },
        async addPieceToWardrobe(pieceId) {
            await this.$store.dispatch("pieces/" + ADD_TO_WARDROBE, pieceId);
            this.reloadLooks();
        },
        async onLikeBtnClick(look) {
            const action = look.isLiked ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES;
            await this.$store.dispatch("looks/" + action, look._id);
        },
        async onDislikeBtnClick(look) {
            const action = look.isDisliked ? CANCEL_LOOK_DISLIKE : DISLIKE_LOOK;
            await this.$store.dispatch("looks/" + action, look._id);
        },
    },
    mounted() {
        this.reloadLooks();
    },
};
</script>

<style scoped>
.filter-panel {
    margin-top: 2rem;
    display: flex;
    background-color: #292b2c;
}

.form-select {
    width: initial;
    display: initial;
    padding: 0.175rem 2.25rem 0.175rem 0.75rem;
}

.filter-panel-item {
    margin: 1rem;
}

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
    height: 450px;
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
    -webkit-transition: 0.4s all;
}

.look-img:hover {
    -webkit-filter: brightness(90%);
}
.look-img-container {
    width: 70%;
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
    width: 9rem;
    margin: 1rem;
    text-align: center;
}

.add-to-wardrobe-btn {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    cursor: pointer;
    color: #28a745;
}

.like-btn,
.dislike-btn {
    margin-top: 1rem;
    cursor: pointer;
}

.like-btn {
    color: #588061;
}

.dislike-btn {
    color: rgb(184, 98, 98);
}

.like-btn:hover {
    color: #28a745;
}

.dislike-btn:hover {
    color: rgb(180, 54, 54);
}

@media screen and (max-width: 1199.98px) {
    .look {
        flex: 40%;
    }

    .add-to-wardrobe-btn {
        display: none;
    }

    .look {
        height: 400px;
        padding: 1rem 1rem 0 1rem;
    }

    .look-img {
        max-height: 280px;
    }
}

@media screen and (max-width: 767.98px) {
    .look {
        flex: 90%;
    }

    .filter-panel {
        flex-wrap: wrap;
    }

    .dropdown-content {
        right: -4rem;
        left: initial;
        max-width: 70vw;
    }
}
</style>