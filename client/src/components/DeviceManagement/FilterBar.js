function FilterBar({ eventHandler }) {
  const { handleSelectedDevice, handleMinT, submitFilter } = eventHandler;
  return (
    <div className='row'>
      <label 
        htmlFor='seletedDevice'
        className='col-4 col-md-3 col-lg-auto col-form-label'
      >
        Loại thiết bị
      </label>
      <div className='col-8 col-md-9 col-lg mb-2'>
        <input 
          type='text'
          className='form-control w-100'
          id='seletedDevice'
          name='seletedDevice'
          onChange={handleSelectedDevice}
        />
      </div>
      <label 
        htmlFor='minT'
        className='col-4 col-md-3 col-lg-auto col-form-label'
      >
        Tổng thời gian thuê tối thiểu
      </label>
      <div className='col-8 col-md-9 col-lg mb-2'>
        <input 
          type='text'
          className='form-control w-100'
          id='minT'
          name='minT'
          onChange={handleMinT}
        />
      </div>
      <div className="col-auto">
        <button
          type='button'
          className="btn btn-primary"
          onClick={submitFilter}
        >
          Lọc
        </button>
      </div>
    </div>
  );
}

export default FilterBar;