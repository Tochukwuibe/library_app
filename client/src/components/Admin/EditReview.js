import React from 'react';

const EditReview = ({ isEdit, form, onSubmit, onInputChange, onDelete }) => {

    const renderActions = () => {
        let view = (
            <button type="submit">Add Review</button>
        );

        if (isEdit) {
            view = (
                <React.Fragment>
                    <button type="submit">Save</button>
                    <div className="delete_post" >
                        <div className="button" onClick={onDelete}>
                            Delete
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        return view;
    }



    return (
        <div className="rl_container article">
            <form onSubmit={onSubmit}>
                <h2> {isEdit ? 'Edit Review' : 'Add a Review'}</h2>


                <div className="form_element">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name..."
                        value={form.name}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form_element">
                    <input
                        name="author"
                        type="text"
                        placeholder="Author..."
                        value={form.author}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form_element">
                    <textarea
                        name="review"
                        type="text"
                        placeholder="Review..."
                        value={form.review}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form_element">
                    <input
                        name="pages"
                        type="number"
                        placeholder="Pages..."
                        value={form.pages}
                        onChange={onInputChange}
                    />
                </div>


                <div className="form_element">
                    <select
                        name="raiting"
                        value={form.raiting}
                        onChange={onInputChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>



                <div className="form_element">
                    <input
                        name="price"
                        type="number"
                        placeholder="Price..."
                        value={form.price}
                        onChange={onInputChange}
                    />
                </div>

                {renderActions()}
            </form>
        </div>
    );
}

export default EditReview;
