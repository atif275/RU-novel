import React, { useState,useEffect,useRef } from "react";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "../firebase";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'; // Import the correct named export

export const SubmitFiction = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
    const [synopsis, setSynopsis] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        genres: [],
        tags: [],
        warnings: [],
        ownershipProof: false,
        manualRelease: false,
        chapters: [{ title: '', content: '' }],
    });
    const [image, setImage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false); // State to track form validation

    // Retrieve the username from the Redux store
    const username = useSelector(state => state.userData.user.username);
      // Define refs for each field
  const titleRef = useRef(null);
  const synopsisRef = useRef(null);
  const genreRef = useRef(null);
  const tagRef = useRef(null);
  const chapterTitleRef = useRef(null);
  const chapterContentRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    const resizeObserverErrorHandler = (e) => {
      e.preventDefault();
    };
    window.addEventListener('error', resizeObserverErrorHandler);
  
    return () => {
      window.removeEventListener('error', resizeObserverErrorHandler);
    };
  }, []);

    const handleEditorChange = (content) => setSynopsis(content);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
// Tooltips for Genres
const genreTooltips = {
  Action: "Stories with intense action scenes and challenges.",
  Adventure: "Journey-based stories with exploration and quests.",
  Comedy: "Humorous stories designed to entertain.",
  Contemporary: "Modern-day, real-world setting.",
  Drama: "Emotionally charged narratives focusing on relationships.",
  Fantasy: "Stories with magical or supernatural elements.",
  Historical: "Stories set in historical periods.",
  Horror: "Stories designed to scare or unsettle.",
  Mystery: "Stories focused on solving a mystery or crime.",
  Psychological: "Stories focusing on mental or emotional states.",
  Romance: "Love-centered stories with emotional focus.",
  Satire: "Stories using humor to criticize social or political issues.",
  "Sci-fi": "Stories involving futuristic or advanced science.",
  "Short Story": "Concise narratives with focused plots.",
  Tragedy: "Stories with sorrowful or disastrous endings."
};

// Tooltips for Tags
const tagTooltips = {
  "Anti-Hero Lead": "A protagonist lacking traditional heroic qualities.",
  "Artificial Intelligence": "Stories featuring AI as central elements.",
  "Attractive Lead": "A protagonist who is notably good-looking.",
  Cyberpunk: "Futuristic stories involving advanced tech and dystopia.",
  Dungeon: "Stories set in or focused on dungeons.",
  Dystopia: "Stories set in a bleak or oppressive future.",
  "Female Lead": "A story featuring a female protagonist.",
  "First Contact": "First interaction between humans and aliens.",
  GameLit: "Stories set in game-like worlds or involving game mechanics.",
  "Gender Bender": "Stories involving gender transformation or confusion.",
  "Genetically Engineered": "Stories focusing on genetic modification.",
  Grimdark: "Morally grey and often violent stories.",
  "Hard Sci-fi": "Science fiction with strict adherence to scientific principles.",
  Harem: "Stories featuring a protagonist with multiple romantic interests.",
  "High Fantasy": "Fantasy stories with epic world-building and magic.",
  LitRPG: "Stories combining literary elements with RPG-like systems.",
  "Low Fantasy": "Fantasy stories with minimal magic or supernatural elements.",
  Magic: "Stories where magic plays a central role.",
  "Male Lead": "A story featuring a male protagonist.",
  "Martial Arts": "Stories focused on combat and martial arts techniques.",
  "Multiple Lead Characters": "Stories with more than one protagonist.",
  Mythos: "Stories drawing from mythology or legendary tales.",
  "Non-Human Lead": "A protagonist who isn't human.",
  "Portal Fantasy / Isekai": "Characters transported to another world.",
  "Post Apocalyptic": "Stories set after a world-ending event.",
  Progression: "Stories featuring characters becoming stronger over time.",
  "Reader Interactive": "Stories where the reader can influence the plot.",
  Reincarnation: "Protagonists reincarnating into new lives.",
  "Ruling Class": "Stories focused on nobles, monarchs, or ruling powers.",
  "School Life": "Stories set in a school or involving student life.",
  "Secret Identity": "Protagonists hiding their true identity.",
  "Slice of Life": "Stories focusing on everyday, realistic experiences.",
  "Soft Sci-fi": "Science fiction with a focus on ideas over realism.",
  "Space Opera": "Epic stories set in space, often involving space travel.",
  Sports: "Stories focusing on sports and athletic competitions.",
  Steampunk: "Futuristic settings with Victorian-era technology.",
  Strategy: "Stories where planning and tactics are crucial.",
  "Strong Lead": "Protagonists with significant strength or power.",
  "Super Heroes": "Stories featuring characters with superhuman abilities.",
  Supernatural: "Stories involving supernatural forces or beings.",
  "Technologically Engineered": "Stories featuring advanced technology and enhancements.",
  "Time Loop": "Stories where characters relive the same period repeatedly.",
  "Time Travel": "Stories featuring travel between different points in time.",
  "Urban Fantasy": "Fantasy set in modern, urban environments.",
  "Villainous Lead": "Stories where the protagonist is an anti-hero or villain.",
  "Virtual Reality": "Stories set in or involving virtual worlds.",
  "War and Military": "Stories focusing on war and military conflict.",
  Wuxia: "Chinese martial arts adventures, often with superhuman abilities.",
  Xianxia: "Chinese fantasy involving cultivation and immortality."
};

    async function handleImageChange(e) {
        // console.log("xxxxxx"+e.target.files[0]);
        const image = e.target.files[0];
        if(image){
          try {
            setUploading(true);
            const storage = getStorage(app);
            const storageRef = ref(storage, "uploads/" +image.name);
            await uploadBytes(storageRef,image);
            const downloadURL = await getDownloadURL(storageRef);
            // console.log(downloadURL);
            setImageURL(downloadURL);
            
            
          } catch (error) {
            // console.log(error);
            
          }finally{
            setUploading(false);
          }

        }
        // setImage(e.target.files[0]);
    };

    const handleGenreChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            genres: checked
                ? [...prevState.genres, value]
                : prevState.genres.filter(genre => genre !== value)
        }));
    };

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            tags: checked
                ? [...prevState.tags, value]
                : prevState.tags.filter(tag => tag !== value)
        }));
    };

    const handleWarningChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            warnings: checked
                ? [...prevState.warnings, value]
                : prevState.warnings.filter(warning => warning !== value)
        }));
    };

    const handleChapterChange = (e, index) => {
        const { name, value } = e.target;
        const chapters = [...formData.chapters];
        chapters[index] = { ...chapters[index], [name]: value };
        setFormData(prevState => ({
            ...prevState,
            chapters
        }));
    };
     // Validate the form to check if all required fields are filled
     useEffect(() => {
      const isFormComplete = () => {
        return (
          imageURL && // Image must be uploaded
          formData.title.trim() !== '' && // Title must not be empty
          synopsis.trim() !== '' && // Synopsis must not be empty
          formData.genres.length > 0 && // At least one genre must be selected
          formData.tags.length > 0 && // At least one tag must be selected
          formData.chapters[0].title.trim() !== '' && // Chapter title must not be empty
          formData.chapters[0].content.trim() !== '' // Chapter content must not be empty
        );
      };
    
      setIsFormValid(isFormComplete());
    }, [formData, synopsis, imageURL, formData.genres, formData.tags]);
    
     // Function to focus on the first empty field
  const focusOnFirstEmptyField = () => {
    if (!imageURL) {
      imageRef.current.focus();
    } else if (formData.title.trim() === '') {
      titleRef.current.focus();
    } else if (synopsis.trim() === '') {
      synopsisRef.current.scrollIntoView(); // Scroll into view for the editor
    } else if (formData.genres.length === 0) {
      genreRef.current.scrollIntoView(); // Scroll into view for genre checkboxes
    } else if (formData.tags.length === 0) {
      tagRef.current.scrollIntoView(); // Scroll into view for tag checkboxes
    } else if (formData.chapters[0].title.trim() === '') {
      chapterTitleRef.current.focus();
    } else if (formData.chapters[0].content.trim() === '') {
      chapterContentRef.current.scrollIntoView(); // Scroll into view for the editor
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
          toast.error("Please Fill all fields.");
          focusOnFirstEmptyField(); // Focus on the first empty field if the form is invalid
          return;
        }
    
        if (!username) {
            toast.error("Please log in to submit fiction.");
            return;
        }
    
        // Normalize title
        const normalizedTitle = formData.title;
        const url = normalizedTitle.replace(/\s+/g, '-');
    
        const submissionData = new FormData();
        submissionData.append('title', normalizedTitle);
        submissionData.append('author', username);
        submissionData.append('synopsis', synopsis);
        submissionData.append('url', url);
        submissionData.append('image', imageURL);
        submissionData.append('genres', JSON.stringify(formData.genres));
        submissionData.append('tags', JSON.stringify(formData.tags));
        submissionData.append('warnings', JSON.stringify(formData.warnings));
        submissionData.append('ownershipProof', formData.ownershipProof);
        submissionData.append('manualRelease', formData.manualRelease);
        submissionData.append('chapters', JSON.stringify(formData.chapters));
        
    
        try {
            const response = await fetch('https://api.ru-novel.ru/api/submissions/add', {
                method: 'POST',
                body: submissionData
            });
    
            if (response.ok) {
                toast.success('Fiction submitted successfully!');
                navigate('/');
                // window.location.reload();
            } 
             else {
                toast.error('Failed to submit fiction. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred while submitting the fiction. Please try again.');
        }
    };

    const contentWarnings = [
        { label: "Profanity", description: "Excessive or obscene swearing and cursing." },
        { label: "Sexual Content", description: "Explicit sexual content (text only), descriptive sex scenes." },
        { label: "Graphic Violence", description: "Detailed descriptions of violent acts, including but not limited to physical harm, bloodshed, mutilation, or any other explicit depictions of violence that may be considered disturbing or excessively graphic." },
        { label: "Sensitive Content", description: "Descriptions of torture, slavery, substance abuse, mental illness, addiction, mentions of rape, self-harm or any other content that may be considered traumatizing or mature that does not fall under the warning tags. This content is not glorified." },
        { label: "AI-Assisted Content", description: "The author has used an AI tool for editing or proofreading. The story thus reflects the author's creativity and structure, but it may use the AI's voice and tone. There may be some negligible amount of snippets generated by AI." },
        { label: "AI-Generated Content", description: "The story was generated using an AI tool; the author prompted and directed the process, and edited the result." }
    ];

  return (
    <div className="flex-grow p-4 bg-gray-200">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        
      <div className="bg-white p-6 md:p-8 shadow-md rounded-lg">
        <h1 className="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
          Submit your fiction
        </h1>

        {/* Submission Info Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-700">
            To submit your fiction, both the fiction information and the first
            chapter or prologue are required. After that, your submission will
            be inspected by our system and one of the staff members.
          </p>
          <p className="text-gray-700 mt-4">
            If you have already posted your story elsewhere, be aware that we
            will require proof of content ownership. You can already submit a
            support ticket with it to speed up the process. Accepted proofs
            include editing your existing description on the site you've posted
            your story on the earliest, or an official document marking you as
            the author. We may also accept an email from a known email address
            of the copyright holder (i.e., published on the official website or
            in print in the book) as valid proof of ownership.
          </p>
          <p className="text-red-500 mt-4">Images are not accepted as proof.</p>
          <p className="text-gray-700 mt-4">
            If you are making a support ticket ahead of time, please include
            link(s) to any pages that have the edited description to make the
            process faster.
          </p>
          <p className="bg-red-500 text-white p-4 rounded mt-4">
  Please note that all fields are mandatory except for <strong>Content Ownership</strong> and <strong>Manual Release</strong>, which are optional. This includes the <strong>Title</strong>, <strong>Cover Image</strong>, <strong>Synopsis</strong>, <strong>Genres</strong> (at least one genre must be selected), <strong>Tags</strong> (at least one tag must be selected), <strong>Chapter Title</strong>, and <strong>Chapter Content</strong>. Make sure all required fields are completed before submitting.
</p>

        </div>

        {/* Fiction Section */}
        <h2 className="text-lg font-semibold mb-4">The Fiction</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cover"
          >
            Cover *
          </label>
          <div className="md:ml-16">
            <div className="flex flex-col md:flex-row">
              <img
                src="https://www.royalroad.com/dist/img/nocover-new-min.png"
                alt="No Cover"
                className="w-48 h-72 mx-auto md:mx-0"
              />
              <div className="ml-4 mt-4 md:mt-0">
                <input
                  
                  type="file"
                  ref={imageRef}
                  className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  onChange={handleImageChange}
                />
                <span className="text-xs text-gray-500 mt-2 block">
                  No file chosen
                </span>
                <div className="bg-gray-100 p-2 rounded flex items-center mt-4">
                  <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                  <p className="text-sm text-gray-600">
                    Please use an image that is at least 400 pixels wide and 600
                    pixels tall or larger.
                  </p>
                </div>
                <div className="bg-red-100 p-2 rounded flex items-center mt-4">
                  <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                  <p className="text-sm text-gray-600">
                    The cover art is mandatory. Do not use copyrighted covers
                    that you don't own and have no permission to use. You can
                    check the{" "}
                    <a
                      href="https://www.royalroad.com/forums/8636"
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Art Forum
                    </a>{" "}
                    for community guides and resources, or showcase your cover
                    art and discuss it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title *
          </label>
          <div className="md:ml-16">
            <input
              id="title"
              name="title"
              type="text"
              ref={titleRef}
              placeholder="Title of fiction"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.title}
            onChange={handleFormChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="synopsis"
          >
            Synopsis *
          </label>
          <div className="md:ml-16">
            <Editor
              ref={synopsisRef}
              apiKey="cezgao67zddrqy0u741tep7k5b5az37uqjv1zvg3uslu7xj3"
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>

      {/* Genres Section */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Genres *</label>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-16">
    {Object.keys(genreTooltips).map((genre) => (
      <label key={genre} className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded mt-1"
          name="genres"
          value={genre}
          ref={genreRef}
          onChange={handleGenreChange}
        />
        <span className="ml-2 text-gray-700">
          {genre}
          <i
            className="fas fa-question-circle ml-2 text-black cursor-pointer"
            data-tooltip-id={`${genre}-tooltip`} // Attach the Tooltip with correct id
          />
          {/* Attach Tooltip component to each genre */}
          <Tooltip 
            id={`${genre}-tooltip`} 
            place="top" 
            effect="solid"
            style={{
              maxWidth: "250px",  // Set max-width for the tooltip
              whiteSpace: "normal",  // Allow content to wrap
            }}
          >
            {genreTooltips[genre]}
          </Tooltip>
        </span>
      </label>
    ))}
  </div>
</div>

{/* Tags Section */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Tags *</label>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-16">
    {Object.keys(tagTooltips).map((tag) => (
      <label key={tag} className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded mt-1"
          name="tags"
          value={tag}
          ref={tagRef}
          onChange={handleTagChange}
        />
        <span className="ml-2 text-gray-700">
          {tag}
          <i
            className="fas fa-question-circle ml-2 text-black cursor-pointer"
            data-tooltip-id={`${tag}-tooltip`} // Attach the Tooltip with correct id
          />
          {/* Attach Tooltip component to each tag */}
          <Tooltip 
            id={`${tag}-tooltip`} 
            place="top" 
            effect="solid"
            style={{
              maxWidth: "250px",  // Set max-width for the tooltip
              whiteSpace: "normal",  // Allow content to wrap
            }}
          >
            {tagTooltips[tag]}
          </Tooltip>
        </span>
      </label>
    ))}
  </div>
</div>


        {/* Content Ownership Section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content Ownership (optional)
          </label>
          <div className="flex flex-col md:ml-16">
            <span className="text-gray-700 font-bold mr-4">
              Does your story use someone else's characters and/or world?
            </span>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded mt-1"
                name="ownershipProof"
                checked={formData.ownershipProof} onChange={handleFormChange} 
              />
              <span className="ml-2 text-gray-700">Fanfiction</span>
            </label>
          </div>
        </div>

        {/* Manual Release Section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Manual Release (optional)
          </label>
          <div className="flex flex-col md:ml-16">
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded mt-1 flex-shrink-0"
                name="manualRelease"
                checked={formData.manualRelease} onChange={handleFormChange}
              />
              <span className="ml-2 text-gray-700">
                If set, you can manually launch this fiction after approval
                instead of it being automatically released.
              </span>
            </label>
          </div>
        </div>

        {/* The First Chapter Section */}
        <h2 className="text-lg font-semibold mb-4">The First Chapter</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="chapterTitle"
          >
            Chapter Title *
          </label>
          <div className="md:ml-16">
            <input
              id="chapterTitle"
              name="title"
              type="text"
              ref ={chapterTitleRef}
              placeholder="Title of Chapter"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.chapters[0].title}
               onChange={(e) => handleChapterChange(e, 0)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="chapterContent"
          >
            Chapter Content *
          </label>
          <div className="md:ml-16">
            <Editor
            ref={chapterContentRef}
              apiKey="cezgao67zddrqy0u741tep7k5b5az37uqjv1zvg3uslu7xj3"
              initialValue="<p>Chapter content here...</p>"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content) => handleChapterChange({ target: { name: 'content', value: content } }, 0)}
            />
          </div>
        </div>

        {/* Info Banner Section */}
        <div className="bg-blue-500 text-white p-4 rounded-lg mb-6 flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          <span>
            It can take <span className="font-bold">up to 48 hours</span> for a
            submission to be approved. If issues are found within the
            submission, it will be rejected and corrections will have to be made
            before re-submission.
          </span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
  <button
    className={`${
      isFormValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
    type="submit"
    onClick={handleSubmit}
    disabled={!isFormValid}
    data-tooltip-id="submit-tooltip" // Attach tooltip to button
  >
    Submit
  </button>
  {!isFormValid && (
    <Tooltip id="submit-tooltip" place="top" effect="solid">
      All fields must be filled properly to enable submission.
    </Tooltip>
  )}
</div>
      </div>
    </div>
  );
};
