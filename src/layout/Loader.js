export default function Loader(props){
    return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}