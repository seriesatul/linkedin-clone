import React, { useState, useEffect } from 'react';
import { fetchPosts, createPost } from '../api'; 
import Post from '../components/Post';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const user = localStorage.getItem('token');

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error("Could not fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleUpdate();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    
    setIsPosting(true);
    try {
      await createPost({ text: newPostText });
      setNewPostText('');
      handleUpdate();
    } catch (error) {
      console.error('Failed to create post', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-20">
              {/* Profile Header */}
              <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-700"></div>
              <div className="px-6 pb-6">
                <div className="flex flex-col items-center -mt-10">
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-800">My Profile</h3>
                  <p className="text-sm text-gray-500">View and edit your profile</p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Profile Views</span>
                    <span className="text-sm font-semibold text-blue-600">127</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Connections</span>
                    <span className="text-sm font-semibold text-blue-600">342</span>
                  </div>
                </div>

                <button className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Feed */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            {/* Create Post Card */}
            {user && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Create a Post</h3>
                    <p className="text-sm text-gray-500">Share your thoughts with your network</p>
                  </div>
                </div>

                <form onSubmit={handlePostSubmit}>
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all"
                    rows="4"
                  />
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isPosting || !newPostText.trim()}
                      className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isPosting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Posting...
                        </>
                      ) : (
                        'Post'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Feed Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Feed
              </h2>
              <button className="p-2 text-gray-500 hover:bg-white hover:shadow-md rounded-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>

            {/* Posts */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Post key={post._id} post={post} onUpdate={handleUpdate} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
                <p className="text-gray-500">Be the first to share something!</p>
              </div>
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Latest News</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Tech Industry Updates', time: '2h ago', readers: '1.2k' },
                  { title: 'Career Growth Tips', time: '5h ago', readers: '890' },
                  { title: 'Remote Work Trends', time: '8h ago', readers: '756' },
                  { title: 'Startup Funding News', time: '1d ago', readers: '623' },
                  { title: 'AI & Machine Learning', time: '2d ago', readers: '542' }
                ].map((news, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-800 mb-1">{news.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                          <span>{news.time}</span>
                          <span>•</span>
                          <span>{news.readers} readers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors border border-blue-200">
                Show More
              </button>
            </div>

            {/* Suggested Connections */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">People You May Know</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Sarah Johnson', title: 'Product Manager', mutual: 12 },
                  { name: 'Mike Chen', title: 'Software Engineer', mutual: 8 },
                  { name: 'Emily Davis', title: 'UX Designer', mutual: 15 }
                ].map((person, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{person.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-800">{person.name}</h4>
                      <p className="text-xs text-gray-500">{person.title}</p>
                      <p className="text-xs text-gray-400">{person.mutual} mutual connections</p>
                    </div>
                    <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;