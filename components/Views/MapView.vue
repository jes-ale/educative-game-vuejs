<template>
    <div class="border p-4" style="height: 400px; width: 100%;">
        <h2 class="text-xl mb-4">{{ title }}</h2>
        <LMap ref="map" :zoom="zoom" :center="center" style="height: 100%; width: 100%;">
            <LTileLayer :url="tileLayerUrl"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                layer-type="base" name="OpenStreetMap" />
            <LMarker :lat-lng="center">
                <LPopup>{{ markerText }}</LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from "vue-leaflet";

const props = defineProps({
    title: {
        type: String,
        default: 'Map View',
    },
    center: {
        type: Array,
        default: () => [47.21322, -1.559482],
    },
    zoom: {
        type: Number,
        default: 6,
    },
    tileLayerUrl: {
        type: String,
        default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    markerText: {
        type: String,
        default: 'You are here!',
    },
});
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";

body {
    margin: 0;
}
</style>
