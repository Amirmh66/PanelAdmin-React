import { useEffect, useState } from "react";
import type { IRoles } from "../../../../Types/Interfaces";
import Button from "../../../Elements/Buttons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
import Loading from "../../../Elements/Loading";

function Roles() {
  //#region States
  const [roles, setRoles] = useState<IRoles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  //#endregion

  useEffect(() => {
    getRoles();
  }, []);

  //#region GetAllRoles
  const getRoles = async () => {
    try {
      const response = await axios(api.getRoles);
      const data = response.data;
      setRoles(data);
    } catch ({ error }: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  //#endregion
  //#region DeleteRole
  const handleDelete = (roleId: string) => {
    setSelectedId(roleId);
    setShowAlert(true);
  };

  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(api.deleteRole(selectedId));
        setShowAlert(false);
        setSelectedId(null);
        getRoles();
      } catch ({ error }: any) {
        setError(error);
      }
    }
  };
  const CancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };
  //#endregion
  //#region DeleteRoles
  const handleDeleteAll = () => {
    setShowAlertAll(true);
  };

  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllRoles);
      setShowAlertAll(false);
      getRoles();
    } catch ({ error }: any) {
      setError(error);
    }
  };
  const CancelDeleteAll = () => {
    setShowAlertAll(false);
  };
  //#endregion

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Roles" ? (
        <div className="theme rounded-md p-2 drop-shadow">
          <div className="head-table">
            <Link to="AddRole">
              <Button text="Create Role" className="bg-green-500" />
            </Link>
            <Button
              text="Refresh Role Table"
              className="bg-blue-500"
              onClick={getRoles}
            />
            <Button
              text="Delete All Roles"
              className="bg-red-800"
              onClick={handleDeleteAll}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="th">
                  <p>Name</p>
                </th>
                <th className="th">
                  <p>Command</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role._id}>
                  <td className="td">
                    <h5>{role.name}</h5>
                  </td>

                  <td className="td">
                    <Button
                      onClick={() => handleDelete(role._id)}
                      text="Delete"
                      className="bg-red-500"
                    />
                    <Link to={`EditRole/${role._id}`}>
                      <Button text="Edit Role" className={"bg-blue-500"} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Outlet />
      )}

      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This Role?"
          onCancle={CancelDelete}
          onConfirm={ConfirmDelete}
        />
      )}
      {showAlertAll && (
        <Alert
          message="Warning: This action will delete all data, but do you want to do it?"
          onCancle={CancelDeleteAll}
          onConfirm={ConfirmDeleteAll}
        />
      )}
    </>
  );
}
export default Roles;