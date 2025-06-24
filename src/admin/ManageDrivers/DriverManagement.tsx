import { useUsers } from "../ManageUsers/hooks/useUsers";
import UsersList from "../ManageUsers/UsersList";

export default function DriverManagement() {
    const { users, ...rest } = useUsers();
    const drivers = users.filter((u) => u.user_type === "driver");

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Driver Management</h1>
            <UsersList users={drivers} {...rest} />
        </div>
    );
}
