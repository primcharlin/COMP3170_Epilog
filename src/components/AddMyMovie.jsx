function AddMyMovie() {
    return (
        <div className="form-container">
            <form>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="username" placeholder="Book Title..."/>
                </div>
                <div className="form-control">
                    <label htmlFor="rating">Rating</label>
                    <input type="text" name="rating" placeholder="Rating"/>
                </div>
                <div className="form-control">
                    <label htmlFor="Notes">Notes</label>
                    <input type="textarea" name="notes" placeholder="Notes"/>
                </div>
                <div className="form-control">
                    <label htmlFor="date-watched">Date Watched</label>
                    <input type="date" name="date-watched"/>
                </div>
                <div className="form-control">
                    <label htmlFor="status">status</label>
                    <input type="text" name="status" placeholder="Status"/>
                </div>
                <button className="save">SAVE</button>
            </form>
        </div>
    );
}

export default AddMyMovie;