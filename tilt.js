document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      // Add transition for smooth reset
      card.style.transition = "transform 0.1s ease";

      const cardInner = card.querySelector('.card-inner'); // If exists
      const title = card.querySelector('h2');
      const img = card.querySelector('img');
      const role = card.querySelector('.role');
      const desc = card.querySelector('p');
      const btn = card.querySelector('.card-btn');

      // Add depth to elements (Parallax)
      if(title) title.style.transform = "translateZ(50px)";
      if(img) img.style.transform = "translateZ(30px)";
      if(role) role.style.transform = "translateZ(40px)";
      if(desc) desc.style.transform = "translateZ(20px)";
      if(btn) btn.style.transform = "translateZ(60px)";
      if(cardInner) cardInner.style.transformStyle = "preserve-3d";

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
  
        const mouseX = (x - centerX) / centerX;
        const mouseY = (y - centerY) / centerY;
  
        const maxRotate = 15; // Increased rotation for more drama
  
        const rotateX = -mouseY * maxRotate; 
        const rotateY = mouseX * maxRotate;
  
        // Apply rotation to card
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        // Glare logic
        let glare = card.querySelector('.card-glare');
        if(!glare) {
            glare = document.createElement('div');
            glare.classList.add('card-glare');
            card.appendChild(glare);
        }
        
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`;
        glare.style.opacity = '1';
        
        // Element Parallax (Dynamic shifting based on mouse)
        // We can slightly shift elements X/Y opposite to movement for floating effect
        if(title) title.style.transform = `translateZ(50px) translateX(${mouseX * -10}px) translateY(${mouseY * -10}px)`;
        if(img) img.style.transform = `translateZ(30px) translateX(${mouseX * -5}px) translateY(${mouseY * -5}px)`;

      });
  
      card.addEventListener("mouseleave", () => {
        // Reset card
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        
        // Reset glare
        const glare = card.querySelector('.card-glare');
        if(glare) {
            glare.style.opacity = '0';
        }

        // Reset elements
        if(title) title.style.transform = "translateZ(50px)"; // Keep Z depth
        if(img) img.style.transform = "translateZ(30px)";
        // ... other resets if needed
      });
    });
  });
