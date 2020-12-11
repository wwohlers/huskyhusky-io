import {ApiResponse} from "@/interfaces/api-response";
import {User} from "@/interfaces/User";
import request from "@/api/http";
import {RequestType} from "@/api/request-type.enum";
import {SignInResponseDto} from "@/interfaces/sign-in-response.dto";
import {Article} from "@/interfaces/Article";
import {UpdateArticleDto} from "@/interfaces/update-article";
import {Comment} from "@/interfaces/comment.interface";
import {Sub} from "@/interfaces/Sub";

export default {
  users: {
    /**
     * Creates a User.
     * @param name name of the user
     * @param email user's email
     * @param password user's initial password
     */
    async createUser(
      name: string,
      email: string,
      password: string
    ): Promise<ApiResponse<User>> {
      const url = "/users";
      const body = { name, email, password };
      return request(RequestType.POST, url, body);
    },

    /**
     * Signs in a User given email and password.
     * @param email
     * @param password
     */
    async signIn(
      email: string,
      password: string
    ): Promise<ApiResponse<SignInResponseDto>> {
      const url = "/users/signin";
      const body = { email, password };
      return request(RequestType.POST, url, body);
    },

    /**
     * Signs a user out.
     * @param token
     */
    async signOut(): Promise<ApiResponse<void>> {
      const url = "/users/signout";
      return request(RequestType.POST, url);
    },

    /**
     * Gets the current user.
     */
    async me(): Promise<ApiResponse<User>> {
      const url = "/users/me";
      return request(RequestType.GET, url);
    },

    /**
     * Updates a User's password.
     * @param oldPassword
     * @param newPassword
     */
    async updatePassword(
      oldPassword: string,
      newPassword: string
    ): Promise<ApiResponse<User>> {
      const url = "/users/update-password";
      const body = { oldPassword, newPassword };
      return request(RequestType.POST, url, body);
    },

    /**
     * Resets a User's password.
     * @param userId
     * @param key
     * @param password
     */
    async resetPassword(
      userId: string,
      key: string,
      password: string
    ): Promise<ApiResponse<User>> {
      const url = "/users/reset-password";
      const body = { userId, key, password };
      return request(RequestType.POST, url, body);
    },

    /**
     * Get list of all Users.
     */
    async getAllUsers(): Promise<ApiResponse<User[]>> {
      const url = "/users";
      return request(RequestType.GET, url);
    },

    /**
     * Gets a User by their id.
     * @param userId
     */
    async getUserById(userId: string): Promise<ApiResponse<User>> {
      const url = `/users/by-id/${userId}`;
      return request(RequestType.GET, url);
    },

    /**
     * Sets a User's admin status.
     * @param userId user id
     * @param value true to make admin, false to revoke admin
     */
    async setAdmin(userId: string, value: boolean): Promise<ApiResponse<User>> {
      const url = `/users/admin/${userId}`;
      const body = { value };
      return request(RequestType.PATCH, url, body);
    },

    /**
     * Sets this User's email.
     * @param userId
     * @param value new email
     */
    async setEmail(value: string): Promise<ApiResponse<User>> {
      const url = "/users/email";
      const body = { value };
      return request(RequestType.PATCH, url, body);
    },

    /**
     * Sets this User's bio.
     * @param value new bio
     */
    async setBio(value: string): Promise<ApiResponse<User>> {
      const url = "/users/bio";
      const body = { value };
      return request(RequestType.PATCH, url, body);
    },

    /**
     * Set whether a User is removed.
     * @param userId
     * @param value true to remove, false otherwise
     */
    async setRemoved(
      userId: string,
      value: boolean
    ): Promise<ApiResponse<User>> {
      const url = `/users/removed/${userId}`;
      const body = { value };
      return request(RequestType.PATCH, url, body);
    },

    /**
     * Request a password reset.
     * @param email email whose account to reset
     */
    async requestPasswordReset(email: string): Promise<ApiResponse<User>> {
      const url = "/users/request-reset-password";
      const body = { value: email };
      return request(RequestType.POST, url, body);
    }
  },

  articles: {
    /**
     * Create an empty Article.
     */
    async createArticle(): Promise<ApiResponse<Article>> {
      const url = "/articles";
      return request(RequestType.POST, url);
    },

    /**
     * Update an Article.
     * @param body
     */
    async updateArticle(body: UpdateArticleDto): Promise<ApiResponse<Article>> {
      const url = "/articles";
      return request(RequestType.PATCH, url, body);
    },

    /**
     * Delete an Article.
     * @param articleId
     */
    async deleteArticle(articleId: string): Promise<ApiResponse<any>> {
      const url = `/articles/${articleId}`;
      return request(RequestType.DELETE, url);
    },

    /**
     * Upload an image to S3.
     * @param body image data
     */
    async uploadImage(body: any): Promise<ApiResponse<string>> {
      const url = "/articles/upload";
      return request(RequestType.POST, url, body);
    },

    /**
     * Get an Article by its id.
     * @param articleId
     */
    async getArticleById(articleId: string): Promise<ApiResponse<Article>> {
      const url = `/articles/${articleId}`;
      return request(RequestType.GET, url);
    },

    /**
     * Get an Article by its name (NOT title).
     * @param name
     */
    async getArticleByName(name: string): Promise<ApiResponse<Article>> {
      const url = `/articles/by-name`;
      const body = { value: name };
      return request(RequestType.POST, url, body);
    },

    /**
     * Gets all Articles.
     * @param isPublic whether to return only public articles.
     */
    async getArticles(isPublic: boolean): Promise<ApiResponse<Article[]>> {
      const publicity = isPublic ? "true" : "false";
      const url = `/articles/all/${publicity}`;
      return request(RequestType.GET, url);
    },

    /**
     * Indicate that an Article has been clicked on.
     * @param articleId id of the article
     */
    async clickArticle(articleId: string): Promise<ApiResponse<void>> {
      const url = `/articles/click/${articleId}`;
      return request(RequestType.POST, url);
    },

    /**
     * Gets the current top articles.
     * @param limit number of articles to retrieve
     */
    async getTopArticles(limit: number): Promise<ApiResponse<Article[]>> {
      const url = `/articles/top/${limit}`;
      return request(RequestType.GET, url);
    },

    /**
     * Gets all Articles within a time range.
     * @param lower the lower bound (as a unix time stamp)
     * @param upper upper bound (as a unix time stamp)
     */
    async getTimeRange(
      lower: number,
      upper: number
    ): Promise<ApiResponse<Article[]>> {
      const url = `/articles/range/${lower}/${upper}`;
      return request(RequestType.GET, url);
    },

    /**
     * Get all Articles with a given author.
     * @param authorId
     */
    async getArticlesByAuthor(
      authorId: string
    ): Promise<ApiResponse<Article[]>> {
      const url = `/articles/author/${authorId}`;
      return request(RequestType.GET, url);
    },

    /**
     * Get all Articles that have a given tag.
     * @param tag
     */
    async getArticlesByTag(tag: string): Promise<ApiResponse<Article[]>> {
      const url = `/articles/tag/${tag}`;
      return request(RequestType.GET, url);
    },

    /**
     * Get a list of all Tags.
     */
    async getAllTags(): Promise<ApiResponse<string[]>> {
      const url = `/articles/tags/all`;
      return request(RequestType.GET, url);
    },

    /**
     * Search Articles.
     * @param query
     */
    async searchArticles(query: string): Promise<ApiResponse<Article[]>> {
      const url = "/articles/search";
      const body = { value: query };
      return request(RequestType.POST, url, body);
    },

    /**
     * Post a Comment to an Article.
     * @param articleId
     * @param name
     * @param content
     */
    async postComment(
      articleId: string,
      name: string,
      content: string
    ): Promise<ApiResponse<Comment>> {
      const url = "/articles/comment";
      const body = { articleId, name, content };
      return request(RequestType.POST, url, body);
    },

    /**
     * Delete a Comment.
     * @param articleId
     * @param commentId
     */
    async deleteComment(
      articleId: string,
      commentId: string
    ): Promise<ApiResponse<void>> {
      const url = `/articles/comment/${articleId}/${commentId}`;
      return request(RequestType.DELETE, url);
    }
  },

  subs: {
    /**
     * Subscribe an email.
     * @param email
     */
    async subscribe(email: string): Promise<ApiResponse<Sub>> {
      const url = "/subs";
      const body = { value: email };
      return request(RequestType.POST, url, body);
    },

    /**
     * Unsubscribe an email.
     * @param email
     */
    async unsubscribe(email: string): Promise<ApiResponse<void>> {
      const url = "/subs";
      const body = { value: email };
      return request(RequestType.DELETE, url, body);
    },

    /**
     * Get a list of all subscribed emails.
     */
    async getAllSubs(): Promise<ApiResponse<string[]>> {
      const url = "/subs";
      return request(RequestType.GET, url);
    }
  }
};
