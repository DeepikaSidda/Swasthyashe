import React, { useState } from 'react';

interface CreateThreadProps {
  onSubmit: (thread: { title: string; content: string; tags: string[] }) => void;
}

const CreateThread: React.FC<CreateThreadProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tags });
    setTitle('');
    setContent('');
    setTags([]);
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={6}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-purple-500 hover:text-purple-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Add a tag"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add Tag
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
      >
        Create Thread
      </button>
    </form>
  );
};

export default CreateThread;