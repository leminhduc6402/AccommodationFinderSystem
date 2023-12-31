const FilterPricePost = ({ getParams }) => {
  return (
    <div className="p-3 w-100 mb-3" style={{ backgroundColor: "#f5f5f5" }}>
      <h5>Xem theo giá</h5>
      <div className="my-2 justify-content-center">
        <div className="d-flex mb-2">
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() => getParams({ minPrice: 0, maxPrice: 1000000 })}
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Dưới 1 triệu
            </p>
          </div>
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() => getParams({ minPrice: 1000000, maxPrice: 2000000 })}
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Từ 1 - 2 triệu
            </p>
          </div>
        </div>
        <div className="d-flex mb-2">
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() => getParams({ minPrice: 2000000, maxPrice: 3000000 })}
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Từ 2 - 3 triệu
            </p>
          </div>
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() => getParams({ minPrice: 3000000, maxPrice: 5000000 })}
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Từ 3 - 5 triệu
            </p>
          </div>
        </div>
        <div className="d-flex mb-2">
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() => getParams({ minPrice: 5000000, maxPrice: 7000000 })}
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Từ 5 - 7 triệu
            </p>
          </div>
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() => getParams({ minPrice: 7000000, maxPrice: 10000000 })}
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Từ 7 - 10 triệu
            </p>
          </div>
        </div>
        <div className="d-flex mb-2">
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() =>
              getParams({ minPrice: 10000000, maxPrice: 15000000 })
            }
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Từ 10 - 15 triệu
            </p>
          </div>
          <div
            className="col-6 px-3"
            style={{ cursor: "pointer" }}
            onClick={() =>
              getParams({ minPrice: 15000000})
            }
          >
            <p className="m-0">
              <i className="fa-solid fa-angle-right"></i> Trên 15 triệu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPricePost;
