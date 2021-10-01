<template>
<div class="container">
    <div class="look">
        <div class="d-flex justify-content-between flex-wrap">
            <div class="return-back-btn" title="Return back" @click="() => this.$router.back()">
                <i class="fas fa-arrow-left fa-2x"></i>
            </div>

            <router-link tag="div" :to="'/users/' + look.author._id" class="look-author">
                <div class="look-author-label text-secondary">Author:</div>
                <UserAvatar :min="true" :user="look.author" />
                <div class="look-author-name ms-2">{{ look.author.name }}</div>
            </router-link>
        </div>

        <div class="d-flex justify-content-between flex-column flex-md-row-reverse">
            <div class="d-flex flex-column">
                <div class="look-img-container mx-auto">
                    <img
                        class="img-fluid rounded look-img"
                        :src="$baseUrl + '/img/looks/' + look.img"
                    />
                </div>

                <div v-if="!look.isDisliked" @click="onLikeBtnClick" class="like-btn">
                    <i :class="look.isLiked ? 'fas' : 'far'" class="fa-thumbs-up"></i>
                    Add to favorites
                </div>
                <div v-if="!look.isLiked" @click="onDislikeBtnClick" class="dislike-btn">
                    <i :class="look.isDisliked ? 'fas' : 'far'" class="fa-thumbs-down"></i>
                    Don't recommend me this look
                </div>
                <div
                    v-if="!look.canRemove"
                    @click="() => (deleteConfirm = true)"
                    class="remove-btn"
                >
                    <i class="fas fa-trash"></i>
                    Delete
                </div>
                <ConfirmModal
                    v-if="deleteConfirm"
                    @confirm="deleteLook"
                    @cancel="() => (deleteConfirm = false)"
                >
                    Are you sure you want to delete this look?
                </ConfirmModal>
            </div>
            <div class="pieces">
                <div v-for="piece in look.pieces" :key="piece._id" class="piece">
                    <div class="piece-availability">
                        <i v-if="piece.inWardrobe" class="fas fa-check"></i>
                    </div>
                    <div class="piece-img-container dropdown">
                        <img
                            class="img-fluid rounded piece-img"
                            :src="$baseUrl + '/img/pieces/' + piece.img"
                        />
                        <div class="dropdown-content">
                            <img
                                class="img-fluid rounded"
                                :src="$baseUrl + '/img/pieces/' + piece.img"
                            />
                            <div
                                class="add-to-wardrobe-btn"
                                v-if="!piece.inWardrobe"
                                @click="addPieceToWardrobe(piece)"
                            >
                                <i class="fas fa-plus"></i>
                                <span> Add to wardrobe</span>
                            </div>
                        </div>
                    </div>
                    <div class="piece-name">{{ piece.name }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import UserAvatar from "../components/UserAvatar.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import {
    ADD_TO_FAVORITES,
    ADD_TO_WARDROBE,
    CANCEL_LOOK_DISLIKE,
    DELETE_LOOK,
    DISLIKE_LOOK,
    FETCH_LOOK,
    REMOVE_FROM_FAVORITES,
} from "../store/actions.type";
export default {
    components: { UserAvatar, ConfirmModal },
    data() {
        return {
            deleteConfirm: false,
        };
    },
    computed: {
        ...mapState("looks", ["look"]),
        ...mapState(["user"]),
    },
    methods: {
        async addPieceToWardrobe(piece) {
            await this.$store.dispatch("pieces/" + ADD_TO_WARDROBE, piece._id);
            piece.inWardrobe = true;
        },
        async onLikeBtnClick() {
            const action = this.look.isLiked ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES;
            await this.$store.dispatch("looks/" + action, this.look._id);
            this.look.isLiked = !this.look.isLiked;
        },
        async onDislikeBtnClick() {
            const action = this.look.isDisliked ? CANCEL_LOOK_DISLIKE : DISLIKE_LOOK;
            await this.$store.dispatch("looks/" + action, this.look._id);
            this.look.isDisliked = !this.look.isDisliked;
        },
        async deleteLook() {
            this.deleteConfirm = false;
            await this.$store.dispatch("looks/" + DELETE_LOOK, this.look._id);
            this.$router.back();
        },
    },
    async mounted() {
        const lookId = this.$route.params.id;
        await this.$store.dispatch("looks/" + FETCH_LOOK, lookId);
    },
};
</script>

<style scoped>
.look {
    width: 60%;
    padding: 2rem 3rem;
    margin: 2rem auto;
    border: 1px gray solid;
    display: flex;
    flex-direction: column;
    border: 1px solid #b1b1b1;
    border-radius: 4px;
    background: rgb(249, 249, 249);
    background: linear-gradient(45deg, rgba(249, 249, 249, 1) 0%, rgba(255, 255, 255, 1) 100%);
    -webkit-box-shadow: -3px 2px 8px 0px rgba(34, 60, 80, 0.09);
    -moz-box-shadow: -3px 2px 8px 0px rgba(34, 60, 80, 0.09);
    box-shadow: -3px 2px 8px 0px rgba(34, 60, 80, 0.09);
}

.return-back-btn {
    cursor: pointer;
}

.look-author {
    cursor: pointer;
    display: flex;
    margin-bottom: 3rem;
}

.look-img {
    max-height: 400px;
}

.look-img-container {
    max-width: 300px;
}

.pieces {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 0.5rem;
}

.piece {
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
}

.piece-availability {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 2rem;
}

.piece-img-container {
    width: 5rem;
}

.piece-img {
    max-height: 50px;
    padding: 0 5px;
    cursor: pointer;
}

.piece-name,
.look-author-name,
.look-author-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.dropdown-content {
    left: 4rem;
    bottom: 1rem;
}

.add-to-wardrobe-btn {
    padding: 1rem 0.5rem;
    cursor: pointer;
}

.like-btn,
.dislike-btn,
.remove-btn {
    margin-top: 1rem;
    cursor: pointer;
}

.like-btn {
    color: #588061;
}

.dislike-btn {
    color: rgb(184, 98, 98);
}

.remove-btn {
    color: rgb(163, 33, 33);
}

.like-btn:hover {
    color: #28a745;
}

.dislike-btn:hover {
    color: rgb(180, 54, 54);
}

@media screen and (max-width: 767.98px) {
    .look {
        width: 100%;
    }

    .look-author-label,
    .return-back-btn {
        display: none;
    }

    .look-author {
        flex-wrap: wrap;
    }

    .pieces {
        padding-top: 3rem;
    }
}
</style>