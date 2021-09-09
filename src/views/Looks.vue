<template>
    <div>
        <div>
            
        </div>
        <InfiniteLoading :identifier="infiniteId" spinner="spiral" @infinite="infiniteHandler">
            <div slot="no-more"></div>
            <div v-if="!filling" slot="no-results">
                <div class="h2 mt-4">Your wardrobe is empty!</div>
                <router-link
                    tag="button"
                    class="btn btn-success ms-auto m-2"
                    to="/wardrobe/fill-up"
                >
                    <span class="h3"><i class="fas fa-plus"></i> Fill up</span>
                </router-link>
            </div>
        </InfiniteLoading>
    </div>
</template>

<script>
export default {};
</script>