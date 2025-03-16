# Portfolio Website

A modern, responsive portfolio website for designers and developers, inspired by the design from [whyramachandran.design](https://whyramachandran.design/).

## Features

- Clean, modern design with smooth animations
- Fully responsive layout for all device sizes
- Dark/light theme toggle with local storage persistence
- Custom cursor effects on desktop
- Mobile-friendly navigation menu
- Smooth scrolling to sections
- Contact form with validation
- Intersection Observer API for scroll animations

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # CSS styles
├── js/
│   └── main.js         # JavaScript functionality
└── images/             # Image assets
```

## Technologies Used

- HTML5
- CSS3 (with CSS variables for theming)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Inter)

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser to view the website
3. Customize the content, colors, and images to make it your own

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #0066ff;
    --secondary-color: #6c757d;
    /* other variables */
}
```

### Adding Projects

To add a new project to the portfolio, copy and modify the existing project card structure in the HTML:

```html
<div class="project-card">
    <div class="project-image">
        <img src="images/your-project-image.jpg" alt="Project Description">
    </div>
    <div class="project-info">
        <h3>Project Title</h3>
        <p>Project description goes here.</p>
        <div class="project-tags">
            <span>Tag 1</span>
            <span>Tag 2</span>
        </div>
        <a href="#" class="project-link">View Case Study <i class="fas fa-arrow-right"></i></a>
    </div>
</div>
```

## License

This project is available for personal and commercial use.

## Credits

- Design inspiration: [whyramachandran.design](https://whyramachandran.design/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/) 