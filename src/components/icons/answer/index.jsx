const AnswerIcon = ({ props, color = "black" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.8944 5.10574C17.0659 3.27724 14.5859 2.25 12 2.25C9.4141 2.25 6.93412 3.27724 5.10562 5.10574C3.27712 6.93425 2.24988 9.41423 2.24988 12.0001C2.24988 14.586 3.27712 17.066 5.10562 18.8945C6.93412 20.723 9.4141 21.7502 12 21.7502C14.5859 21.7502 17.0659 20.723 18.8944 18.8945C20.7229 17.066 21.7501 14.586 21.7501 12.0001C21.7501 9.41423 20.7229 6.93425 18.8944 5.10574ZM17.8341 6.16699C18.2186 6.55322 18.5641 6.97653 18.8653 7.43074L15.7078 11.1564L13.0903 3.82324C14.8874 4.05799 16.5558 4.88229 17.8341 6.16699ZM14.5866 12.4689L12.8841 14.4723L10.2975 14.0036L9.41343 11.5314L11.1159 9.52793L13.7025 9.99668L14.5866 12.4689ZM6.16593 6.16699C7.58237 4.74286 9.47286 3.88903 11.4778 3.76793L13.1194 8.36168L5.46562 6.96762C5.68159 6.68596 5.91552 6.41853 6.16593 6.16699ZM4.37343 15.1445C3.92837 14.0577 3.71937 12.8887 3.76026 11.7149C3.80115 10.5412 4.091 9.38959 4.61062 8.33637L9.41156 9.21293L4.37343 15.1445ZM6.16593 17.8332C5.78136 17.447 5.43593 17.0237 5.13468 16.5695L8.29218 12.8439L10.9097 20.1732C9.1131 19.9395 7.44476 19.1166 6.16593 17.8332ZM17.8341 17.8332C16.4176 19.2574 14.5271 20.1112 12.5222 20.2323L10.8806 15.6386L18.5344 17.0364C18.3183 17.3167 18.0843 17.5829 17.8341 17.8332ZM14.5884 14.7873L19.6266 8.85574C20.0716 9.94258 20.2806 11.1116 20.2397 12.2853C20.1988 13.459 19.909 14.6106 19.3894 15.6639L14.5884 14.7873Z"
        fill={color}
      />
    </svg>
  );
};

export default AnswerIcon;
