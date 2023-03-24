declare module '*.json' {
  const value: unknown;
  export default value;
}

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
