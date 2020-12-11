import {ApiResponse} from "@/interfaces/api-response";
import {User} from "@/interfaces/User";
import {SignInResponseDto} from "@/interfaces/sign-in-response.dto";
import {Article} from "@/interfaces/Article";
import {UpdateArticleDto} from "@/interfaces/update-article";
import {Comment} from "@/interfaces/comment.interface";
import {Sub} from "@/interfaces/Sub";

export default interface ApiInterface {
  users: {
    /**
     * Creates a User.
     * @param name name of the user
     * @param email user's email
     * @param password user's initial password
     */
    createUser: (
      name: string,
      email: string,
      password: string
    ) => Promise<ApiResponse<User>>;

    /**
     * Signs in a User given email and password.
     * @param email
     * @param password
     */
    signIn: (
      email: string,
      password: string
    ) => Promise<ApiResponse<SignInResponseDto>>;

    /**
     * Signs a user out.
     * @param token
     */
    signOut: () => Promise<ApiResponse<void>>;

    /**
     * Gets the User bearing the auth token.
     */
    me: () => Promise<ApiResponse<User>>;

    /**
     * Updates a User's password.
     * @param oldPassword
     * @param newPassword
     */
    updatePassword: (
      oldPassword: string,
      newPassword: string
    ) => Promise<ApiResponse<User>>;

    /**
     * Resets a User's password.
     * @param userId
     * @param key
     * @param password
     */
    resetPassword: (
      userId: string,
      key: string,
      password: string
    ) => Promise<ApiResponse<User>>;

    /**
     * Get list of all Users.
     */
    getAllUsers: () => Promise<ApiResponse<User[]>>;

    /**
     * Gets a User by their id.
     * @param userId
     */
    getUserById: (userId: string) => Promise<ApiResponse<User>>;

    /**
     * Sets a User's admin status.
     * @param userId user id
     * @param value true to make admin, false to revoke admin
     */
    setAdmin: (userId: string, value: boolean) => Promise<ApiResponse<User>>;

    /**
     * Sets this User's email.
     * @param userId
     * @param value new email
     */
    setEmail: (userId: string, value: string) => Promise<ApiResponse<User>>;

    /**
     * Sets this User's bio.
     * @param userId
     * @param value new bio
     */
    setBio: (value: string) => Promise<ApiResponse<User>>;

    /**
     * Set whether a User is removed.
     * @param userId
     * @param value true to remove, false otherwise
     */
    setRemoved: (
      userId: string,
      value: boolean
    ) => Promise<ApiResponse<User>>;

    /**
     * Request a password reset.
     * @param email email whose account to reset
     */
    requestPasswordReset: (email: string) => Promise<ApiResponse<User>>;
  },

  articles: {
    /**
     * Create an empty Article.
     */
    createArticle: () => Promise<ApiResponse<Article>>;

    /**
     * Update an Article.
     * @param body
     */
    updateArticle: (body: UpdateArticleDto) => Promise<ApiResponse<Article>>;

    /**
     * Delete an Article.
     * @param articleId
     */
    deleteArticle: (articleId: string) => Promise<ApiResponse<any>>;

    /**
     * Upload an image to S3.
     * @param body image data
     */
    uploadImage: (body: any) => Promise<ApiResponse<string>>;

    /**
     * Get an Article by its id.
     * @param articleId
     */
    getArticleById: (articleId: string) => Promise<ApiResponse<Article>>;

    /**
     * Get an Article by its name (NOT title).
     * @param name
     */
    getArticleByName: (name: string) => Promise<ApiResponse<Article>>;

    /**
     * Gets all Articles.
     * @param isPublic whether to return only public articles.
     */
    getArticles: (isPublic: boolean) => Promise<ApiResponse<Article[]>>;

    /**
     * Indicate that an Article has been clicked on.
     * @param articleId id of the article
     */
    clickArticle: (articleId: string) => Promise<ApiResponse<void>>;

    /**
     * Gets the current top articles.
     * @param limit number of articles to retrieve
     */
    getTopArticles: (limit: number) => Promise<ApiResponse<Article[]>>;

    /**
     * Gets all Articles within a time range.
     * @param lower the lower bound (as a unix time stamp)
     * @param upper upper bound (as a unix time stamp)
     */
    getTimeRange: (
      lower: number,
      upper: number
    ) => Promise<ApiResponse<Article[]>>;

    /**
     * Get all Articles with a given author.
     * @param authorId
     */
    getArticlesByAuthor: (
      authorId: string
    ) => Promise<ApiResponse<Article[]>>;

    /**
     * Get all Articles that have a given tag.
     * @param tag
     */
    getArticlesByTag: (tag: string) => Promise<ApiResponse<Article[]>>;

    /**
     * Get a list of all Tags.
     */
    getAllTags: () => Promise<ApiResponse<string[]>>;

    /**
     * Search Articles.
     * @param query
     */
    searchArticles: (query: string) => Promise<ApiResponse<Article[]>>;

    /**
     * Post a Comment to an Article.
     * @param articleId
     * @param name
     * @param content
     */
    postComment: (
      articleId: string,
      name: string,
      content: string
    ) => Promise<ApiResponse<Comment>>;

    /**
     * Delete a Comment.
     * @param articleId
     * @param commentId
     */
    deleteComment: (
      articleId: string,
      commentId: string
    ) => Promise<ApiResponse<void>>;
  }

  subs: {
    /**
     * Subscribe an email.
     * @param email
     */
    subscribe: (email: string) => Promise<ApiResponse<Sub>>;

    /**
     * Unsubscribe an email.
     * @param email
     */
    unsubscribe: (email: string) => Promise<ApiResponse<void>>;

    /**
     * Get a list of all subscribed emails.
     */
    getAllSubs: () => Promise<ApiResponse<string[]>>;
  }
};
