<template>
    <pre class="ui-code">
        <code><slot></slot></code>
    </pre>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .ui-code code {
        display: block;
        padding: 16px;
        margin: 0 0 9.5px;
        font-size: 14px;
        line-height: 1.42;
        word-break: break-all;
        word-wrap: break-word;
        color: #373a3c;
        border: 1px solid #ddd;
        background-color: #f5f5f5;
        border-radius: 2px;
        font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
        overflow: auto;
    }
</style>
