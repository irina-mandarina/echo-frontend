<template>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>
            {{ currentPageTitle }}
        </title>
    </head>
    <div>
        <NuxtPage />
    </div>
    <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <Link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lobster&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
    <Link href="https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
</template>

<script setup>
    import { useRouter } from "vue-router"
    
    const router = useRouter()

    const currentPageTitle = computed(() => {
            const route = router.currentRoute.value.path.replaceAll("/", "")
            return route === "" ? "Home" : route[0].toUpperCase() + route.slice(1)
        })
</script>

<style>
    @font-face {
        src: url("assets/Franklin Gothic Demi Cond Regular.ttf");
        font-family: 'Franklin Gothic Demi Condensed';
    }

    body {
        font-family: 'Roboto', serif;
        color: #1f1f1f;
    }

    html {
        background-color: #eae8e8;
    }

    html, body, #__nuxt, [data-v-inspector="app.vue:2:5"], .layout-container {
        height: 100%;
    }

    .font-franklin {
        font-family: 'Franklin Gothic Demi Condensed', sans-serif;
    }

    .font-roboto {
        font-family: 'Roboto', serif;
    }

    .font-roboto-light {
        font-family: 'Roboto', serif;
        font-weight: 300;
    }
    ::-webkit-scrollbar {
    width: 15px;
    margin: 20px;
    padding: 20px;
}

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #c7b1b1;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #b2b1b1;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #c3b9b4;
        filter: drop-shadow(0 20px 20px rgba(90, 133, 168, 0.79));
        transition: all 400ms ease-in-out;
    }
</style>
