import React from "react";

function CustomerDelete({ stateRefresh, id }) {
  const deleteCustomer = (id) => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  };

  return (
    <button
      onClick={(e) => {
        deleteCustomer(id);
      }}
    >
      삭제
    </button>
  );
}

export default CustomerDelete;
