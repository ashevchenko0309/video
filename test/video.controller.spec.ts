import request from "supertest";
import app from "./../src/app";

describe("Video controller", () => {

  beforeAll((done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  })

  afterAll((done) => {
    request(app)
      .delete("/api/videos/1")
      .expect(200, done);
  })

  it("GET /api/videos/99 should return 404", (done) => {
    request(app)
      .get("/api/videos/99")
      .expect(404, done);
  });

  it("GET /api/videos with pagi should return 200", (done) => {
    request(app)
      .get("/api/videos?start=0&end=1")
      .expect(200, done);
  });

  it("GET /api/videos/1 should return 200", (done) => {
    request(app)
      .get("/api/videos/1")
      .expect(200, done);
  });

  it("GET /api/random should return 404", (done) => {
    request(app)
      .get("/api/random")
      .expect(404, done);
  });

  it("POST /api/videos with all data should return 201", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome videos')
      .field('description', 'my awesome description for videos')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  });

  it("POST /api/videos without title should return 422", (done) => {
    request(app)
      .post("/api/videos")
      .field('description', 'my awesome description for videos')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/videos without description should return 422", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome videos')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/videos without videos should return 422", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome videos')
      .field('description', 'my awesome description for videos')
      .field('categoryId', '1')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/videos without thumb should return 422", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome videos')
      .field('description', 'my awesome description for videos')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .expect(422, done);
  });

  // TODO: create tests for category fields
  it("POST /api/videos without categories fields should return 422", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome videos')
      .field('description', 'my awesome description for videos')
      .attach('videos', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/videos with string instead number categoryId field should return 422", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', 'qwerty')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/videos with invalid categoryName field should return 422", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryName', 'qwer')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/videos with valid categoryId field should return 201", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  });

  it("POST /api/videos with valid categoryName field should return 201", (done) => {
    request(app)
      .post("/api/videos")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryName', 'some new category')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  });

  it("DELETE /api/videos/2 should return 200", (done) => {
    request(app)
      .delete("/api/videos/2")
      .expect(200, done);
  });

});