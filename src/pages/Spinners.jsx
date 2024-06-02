import ClipLoader from "react-spinners/ClipLoader";

const Spinners = ({ loading }) => {
  const styles = {
    display: "block",
    margin: "100px auto",
  };

  return (
    <ClipLoader
      color={"rgb(246, 247, 249)"}
      loading={loading}
      size={150}
      cssOverride={styles}
    />
  );
};

export default Spinners;
