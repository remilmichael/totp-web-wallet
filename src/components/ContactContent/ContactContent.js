import ContactImage from '../../assets/contact.svg';

function ContactContent() {
    return (
        <div class="top_content">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center">
                    <h2>Let's talk about everything!
                    </h2>
                    <figure>
                        <img src={ContactImage} alt="contact" />
                    </figure>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control mb-3" placeholder="Your Name" />
                    <input type="text" class="form-control mb-3" placeholder="Email" />
                    <input type="text" class="form-control mb-3" placeholder="Subject" />
                    <textarea name="" id="" cols="30" rows="6" placeholder="Your Message" class="form-control mb-3"></textarea>
                    <div class="cf"></div>
                    <input type="button" value="Send" class="btn btn_theme" />
                </div>
            </div>
        </div>
    </div>
    )
}

export default ContactContent