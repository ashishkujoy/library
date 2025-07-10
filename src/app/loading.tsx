import Image from "next/image";

type Props = {
    smallScreen?: boolean;
    message?: string;
}

const LoadingView = (props: Props) => {
    const imgWidth = props.smallScreen ? 150 : 100;

    return (
        <div className={`loading ${props.smallScreen ? '': 'loading-fullscreen'}`}>
            <Image src={"/loading.gif"} width={imgWidth} height={imgWidth} alt="loading ..." />
            <h6 className="loading-message">
                {props.message ? props.message : 'Working on it'}
            </h6>
        </div>
    );
};

export default LoadingView;
