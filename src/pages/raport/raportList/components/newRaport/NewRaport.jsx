import './newRaport.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAddNewRaportMutation } from '../../../redux/raportApiSlice';
import Loader from '../../../../../components/loader/Loader';

const NewRaport = ({ setScreenNR }) => {
  const { username } = useParams();
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [detail, setDetail] = useState('');
  const [status, setStatus] = useState(true);

  const [addNewRaport, { isLoading, isError, error }] =
    useAddNewRaportMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewRaport({
        chapter,
        verse,
        status,
        detail,
        username,
      }).unwrap();
      alert(`berhasil ditambahkan`);
      setScreenNR(false);
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container-raport-new">
      <form className="wrapper" onSubmit={handleSubmit}>
        <span className="close" onClick={() => setScreenNR(false)}>
          x
        </span>
        <div style={{ textAlign: 'center' }}>
          <h3>New</h3>

          <p
            style={{
              opacity: isError ? 1 : 0,
              color: 'red',
              fontSize: '0.8rem',
              width: '200px',
            }}
          >
            {error?.data?.message}
          </p>
        </div>

        <div className="inputBox">
          <input
            name="chapter"
            type="number"
            required="required"
            min={0}
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
          <span>Chapter</span>
        </div>
        <div className="inputBox">
          <input
            name="verse"
            type="number"
            required="required"
            min={0}
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
          />
          <span>Verse</span>
        </div>
        <div className="inputBox">
          <input
            name="detail"
            type="text"
            required="required"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <span>detail</span>
        </div>
        <div className="input-status">
          <label htmlFor="status">Mengulang?</label>
          <input
            id="status"
            type="checkbox"
            checked={!status}
            onChange={() => {
              setStatus((prev) => !prev);
            }}
          />
        </div>

        <button className="enter">Add</button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

NewRaport.propTypes = {
  setScreenNR: PropTypes.func.isRequired,
};

export default NewRaport;
