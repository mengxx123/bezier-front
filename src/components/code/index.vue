<template>
    <pre class="ui-code">
        <code>12<slot></slot></code>
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
    .ui-code {
        display: block;
        padding: 9px;
        margin: 0 0 9.5px;
        font-size: 13px;
        line-height: 1.42;
        word-break: break-all;
        word-wrap: break-word;
        color: #373a3c;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 2px;
        font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
        overflow: auto;
    }
</style>
