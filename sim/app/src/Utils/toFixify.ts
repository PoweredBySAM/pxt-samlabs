export default (value: number) => {

    return !!value && +value ? value.toFixed(1) : '0.0';

}