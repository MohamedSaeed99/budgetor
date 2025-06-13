type StorageData = {
    [key: string]: number;
};

type ColorMap = {
    [key: string]: string;
};

const data: StorageData = {
    "system": 11.37,
    "photos": 4.29,
    "apps": 3.22,
    "mail": 1.84,
    "messages": 1.12,
    "safari": 0.84,
    "books": 0.35,
    "music": 0.32,
    "podcasts": 0.12,
    "tv": 0.11,
    "voiceMemos": 0.11,
    "other": 0.11
};

const colors: ColorMap = {
    "system": "#FF9500",
    "photos": "#FF2D55",
    "apps": "#5856D6",
    "mail": "#34C759",
    "messages": "#007AFF",
    "safari": "#5AC8FA",
    "books": "#FF9500",
    "music": "#FF2D55",
    "podcasts": "#5856D6",
    "tv": "#34C759",
    "voiceMemos": "#007AFF",
    "other": "#5AC8FA"
};

const HorizontalBar = () => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ 
                width: '80%', 
                height: '30px', 
                display: 'flex',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {Object.entries(data).map(([key, value]) => (
                    <div
                        key={key}
                        style={{
                            width: `${(value / total) * 100}%`,
                            height: '100%',
                            backgroundColor: colors[key],
                            transition: 'width 0.3s ease',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HorizontalBar;