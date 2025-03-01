function Error() {
  return (
    <div className="error">
      <span role="img" aria-label="error">
        💥
      </span>
      <span>There was an error fetching questions.</span>
    </div>
  );
}

export default Error;
