import { useState } from 'react';
import { useUpdateUserProfileMutation } from '../services/api';

export default function UserHeader({ profile }) {
    const [updateUserProfile, { isLoading: isUpdating, error: updateError }] =
        useUpdateUserProfileMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState('');

    const handleEditClick = () => {
        setNewUserName(profile?.userName || '');
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewUserName(profile?.userName || '');
    };

    return (
        <>
            {isEditing ? (
                <section className="user-info">
                    <h1>Edit user info</h1>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await updateUserProfile({
                                userName: newUserName,
                            }).unwrap();
                            setIsEditing(false);
                        }}
                    >
                        <div className="input-wrapper">
                            <label htmlFor="username">User name</label>
                            <input
                                autoFocus
                                id="username"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="firstname">First name</label>
                            <input
                                id="firstname"
                                value={profile?.firstName || ''}
                                readOnly
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="lastname">Last name</label>
                            <input
                                id="lastname"
                                value={profile?.lastName || ''}
                                readOnly
                            />
                        </div>
                        <div className="edit-name-actions">
                            <button
                                type="submit"
                                className="edit-button"
                                disabled={isUpdating}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="edit-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        {updateError && <p className="error">Update failed</p>}
                    </form>
                </section>
            ) : (
                <div className="header">
                    <h1>
                        Welcome back
                        <br />
                        {profile?.firstName} {profile?.lastName}!
                    </h1>
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit Name
                    </button>
                </div>
            )}
        </>
    );
}
