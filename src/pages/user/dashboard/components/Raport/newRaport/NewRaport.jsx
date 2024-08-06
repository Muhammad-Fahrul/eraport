import './newRaport.css';
import { useEffect, useRef, useState } from 'react';
import { useAddRaportMutation } from '../../../../../raport/redux/raportApiSlice';
import Loader from '../../../../../../components/loader/Loader';

const NewRaport = () => {
  const raportNameRef = useRef(null);

  const [borderParent, setBorderParent] = useState(false);

  const [addRaport, { isSuccess, isLoading, isError, error }] =
    useAddRaportMutation();

  const handleAddRaport = async (e) => {
    e.preventDefault();
    try {
      await addRaport({
        raportName: raportNameRef.current.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert(`skema ${raportNameRef.current.value} berhasil ditambahkan`);
      raportNameRef.current.value = '';
    } else if (isError) {
      alert(error.data.message);
    }
  }, [isSuccess, raportNameRef, isError, error]);

  let raportAddedLoader;

  if (isLoading) {
    raportAddedLoader = <Loader />;
  }

  return (
    <div className="add-new-form-section">
      <h3>Create Raport</h3>
      <section className={`${borderParent && 'focus'}`}>
        <form action="">
          <input
            autoComplete="off"
            ref={raportNameRef}
            type="text"
            name="raportName"
            id="raportName"
            onFocus={() => setBorderParent(true)}
            onBlur={() => setBorderParent(false)}
            placeholder="Book Name"
            required
          />
          {raportAddedLoader}
          <button
            className="add-new-input"
            onClick={(e) => {
              if (raportNameRef) {
                handleAddRaport(e);
              }
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewRaport;
