import "@styles/_loading.scss";

interface Props {
    text?: string,
    fullscreen?: boolean
}

const Loading = ({
    text = "",
    fullscreen = true
}: Props) => {
  return (
    <div className={fullscreen ? 'loading loading-fullscreen' : 'loading'}>
      <div className="loading-spinner-wheel" />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;