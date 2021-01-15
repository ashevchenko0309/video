import request from "supertest";
import app from "./../src/app";

describe("Video controller", () => {

  beforeAll((done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  })

  afterAll((done) => {
    request(app)
      .delete("/api/video/1")
      .expect(200, done);
  })

  it("GET /api/video/99 should return 404", (done) => {
    request(app)
      .get("/api/video/99")
      .expect(404, done);
  });

  it("GET /api/video with pagi should return 200", (done) => {
    request(app)
      .get("/api/video?start=0&end=1")
      .expect(200, done);
  });

  it("GET /api/video/1 should return 200", (done) => {
    request(app)
      .get("/api/video/1")
      .expect(200, done);
  });

  it("GET /api/random should return 404", (done) => {
    request(app)
      .get("/api/random")
      .expect(404, done);
  });

  it("POST /api/video with all data should return 201", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  });

  it("POST /api/video without title should return 422", (done) => {
    request(app)
      .post("/api/video")
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/video without description should return 422", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/video without video should return 422", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/video without thumb should return 422", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .expect(422, done);
  });

  // TODO: create tests for category fields
  it("POST /api/video without categories fields should return 422", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/video with string instead number categoryId field should return 422", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', 'qwerty')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/video with invalid categoryName field should return 422", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryName', 'qwer')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(422, done);
  });

  it("POST /api/video with valid categoryId field should return 201", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryId', '1')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  });

  it("POST /api/video with valid categoryName field should return 201", (done) => {
    request(app)
      .post("/api/video")
      .field('title', 'my awesome video')
      .field('description', 'my awesome description for video')
      .field('categoryName', 'some new category')
      .attach('video', 'test/attaches/video.mp4')
      .attach('thumb', 'test/attaches/image.jpg')
      .expect(201, done);
  });

  it("DELETE /api/video/2 should return 200", (done) => {
    request(app)
      .delete("/api/video/2")
      .expect(200, done);
  });

});