<template>
    <div>
        <div class="head">
            <h1>Stop asking yourself <i>"what to wear?"</i></h1>
            <h3>Style Besda - your personal fashion-stylist</h3>
            <div class="d-flex justify-content-center flex-wrap">
                <router-link to="/login" class="btn btn-light btn-lg mx-3 mt-3"
                    >Sign in</router-link
                >
                <router-link to="/register" class="btn btn-light btn-lg mx-3 mt-3"
                    >Sign up</router-link
                >
            </div>
        </div>
        <div class="container">
            <div class="h3 my-5">
                How does it work?
                <hr class="mx-auto w-25" />
            </div>
            <div class="steps">
                <div class="step">
                    <div class="step-desc">Add items to your wardrobe</div>
                    <div class="step-img">
                        <img src="/static/img/step1.png" />
                    </div>
                </div>
                <hr />
                <div class="step flex-md-row-reverse">
                    <div class="step-desc">
                        Get personalized outfit recommendations based on your wardrobe
                    </div>
                    <div class="step-img">
                        <img src="/static/img/step2.png" />
                    </div>
                </div>
                <hr class="ms-auto" />
                <div class="step">
                    <div class="step-desc">
                        Like outfits to add them to favorites or dislike to hide them from next
                        recommendations
                    </div>
                    <div class="step-img">
                        <img src="/static/img/step3.png" />
                    </div>
                </div>
                <hr />
                <div class="step flex-md-row-reverse">
                    <div class="step-desc">Create and share your own outfit ideas</div>
                    <div class="step-img">
                        <img src="/static/img/step4.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.head {
    padding-bottom: 2rem;
    background: url("/static/img/clothes-bg.png") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: white;
}

.spacer {
    height: 0;
    padding-bottom: 125%; /* for a 1.25 height/width ratio */
}

.head h1 {
    padding: 6rem 1rem 4rem 1rem;
    font-size: 3.5rem;
    font-weight: bold;
}

.step {
    display: flex;
    justify-content: space-between;
    margin: 2rem auto;
    font-size: 25px;
}

.step-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.step img {
    height: auto;
    width: 100%;
    max-width: 30rem;
}

hr {
    width: 50%;
}

@media screen and (max-width: 767.98px) {
    .step {
        flex-direction: column;
    }

    .step-desc {
        padding: 2rem 0;
    }
}

@media screen and (min-width: 1200px) {
    .steps {
        width: 65%;
        margin: auto;
    }
}
</style>