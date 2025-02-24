export const staticHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Static HTML Content</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    header {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      text-align: center;
    }
    main {
      padding: 20px;
    }
    section {
      margin-bottom: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 10px 0;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    .content-block {
      background: #fff;
      padding: 15px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to Static HTML Content</h1>
    <p>This is a header section with a brief introduction.</p>
  </header>
  <main>
    <section>
      <h2>About This Page</h2>
      <p>This page is designed to showcase static HTML content. It includes multiple sections to demonstrate layout and scrolling behavior.</p>
    </section>
    <section>
      <h2>Features</h2>
      <div class="content-block">
        <h3>Feature 1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium metus sed justo vestibulum, et pharetra libero tempor.</p>
      </div>
      <div class="content-block">
        <h3>Feature 2</h3>
        <p>Quisque euismod magna sit amet purus aliquet, vel tempor risus molestie. Fusce non volutpat orci. Nulla facilisi.</p>
      </div>
      <div class="content-block">
        <h3>Feature 3</h3>
        <p>Mauris hendrerit orci et tortor elementum, sed auctor velit convallis. Nam fermentum vehicula libero, id tincidunt enim fringilla eget.</p>
      </div>
    </section>
    <section>
      <h2>More Information</h2>
      <p>Here is some additional information presented in a longer format to test scrolling behavior in the rendered output:</p>
      <ul>
        <li>Item 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Item 2: Pellentesque pretium metus sed justo vestibulum.</li>
        <li>Item 3: Quisque euismod magna sit amet purus aliquet.</li>
        <li>Item 4: Fusce non volutpat orci. Nulla facilisi.</li>
        <li>Item 5: Mauris hendrerit orci et tortor elementum.</li>
        <li>Item 6: Nam fermentum vehicula libero, id tincidunt enim fringilla eget.</li>
        <li>Item 7: Vivamus malesuada nunc ac purus aliquet, eget malesuada ipsum suscipit.</li>
        <li>Item 8: Proin fringilla, ligula eget pellentesque pharetra, lorem erat luctus enim.</li>
        <li>Item 9: Nulla vitae turpis cursus, accumsan lacus id, consectetur enim.</li>
        <li>Item 10: Integer dignissim, enim ut tincidunt pharetra, libero purus fermentum nisi.</li>
      </ul>
    </section>
  </main>
</body>
</html>
`;