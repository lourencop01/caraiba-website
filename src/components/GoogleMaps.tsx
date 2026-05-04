export default function GoogleMaps() {
    return (
      <div className="bg-surface-dark rounded-2xl h-96 flex items-center justify-center border border-border shadow-theme">
        <iframe
        title="Salon Concept Location"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d187.77251947190047!2d-8.6037821!3d41.1484885!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464f0361f184f%3A0x97beb079a0ad086e!2sHairdresser%20Porto%20Gomes%20Cortesecores%20Highlights%20Especialistas!5e0!3m2!1spt-BR!2spt!4v1755716801186!5m2!1spt-BR!2spt"
        width="100%"
        height="100%"
        style={{ borderRadius: '20px' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    );
  }