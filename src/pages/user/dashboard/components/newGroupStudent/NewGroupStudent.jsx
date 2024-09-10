import { useState } from 'react';

import './newGroupStudent.css'; // Import file CSS untuk styling
import { useAddGroupMutation } from '../../../../student/redux/studentApiSlice';

function NewGroupStudent() {
  const [groupName, setGroupName] = useState('');
  const [borderParent, setBorderParent] = useState(false);

  const [addGroup, { isLoading }] = useAddGroupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addGroup({ groupName });
      console.log(result.data.message);
      setGroupName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-new-form-section">
      <h3>Add Group Student</h3>
      <section className={`${borderParent && 'focus'}`}>
        <form onSubmit={handleSubmit} className="collaborator-form">
          <input
            type="text"
            id="groupname"
            value={groupName}
            onFocus={() => setBorderParent(true)}
            onBlur={() => setBorderParent(false)}
            placeholder="Group name"
            onChange={(e) => setGroupName(e.target.value)}
          />

          <button type="submit" disabled={isLoading} className="add-new-input">
            <i className="fa-solid fa-plus"></i>
          </button>
        </form>
      </section>
    </div>
  );
}

export default NewGroupStudent;
